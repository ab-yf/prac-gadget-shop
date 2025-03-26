---

# Practice Gadget Shop

A full-stack CRUD application for managing gadget inventory, built with **Angular 19**, **.NET 8**, and **SQL Server**. This project demonstrates a complete solution—from a modern web front-end to a robust back-end API—for managing both customer and inventory data in a gadget shop.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (PracticeGadgetShopApi)](#backend-setup-practicegadgetshopapi)
  - [Frontend Setup (prac-gadget-shop)](#frontend-setup-prac-gadget-shop)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Contact](#contact)

## Overview

**Practice Gadget Shop** is a demonstration project designed to showcase a modern full-stack application. The backend is built using .NET 8 and leverages SQL Server for data persistence, while the frontend is developed in Angular 19, offering a dynamic and responsive user interface.

This application enables users to perform CRUD (Create, Read, Update, Delete) operations on both customer and inventory records, making it a great reference for integrating a web API with a modern single-page application.

## Features

- **Customer Management:** Save, retrieve, update, and delete customer data.
- **Inventory Management:** Save, retrieve, update, and delete inventory data.
- **Modern Frontend:** Built with Angular 19 to provide a responsive and dynamic user experience.
- **Robust Backend:** .NET 8 API that handles business logic and data management via stored procedures.
- **Database Integration:** Uses SQL Server for reliable data storage.
- **Modular Design:** Clean separation between frontend and backend, facilitating scalability and maintainability.

## Project Structure

The repository is organized into two main projects:

- **PracticeGadgetShopApi:** Contains the backend code for the .NET 8 API.
- **prac-gadget-shop:** Contains the Angular 19 frontend application.

Additional files such as `.gitignore` ensure that unnecessary files are excluded from version control.

## Installation

### Prerequisites

- **Node.js** and **npm** – for running the Angular application.
- **Angular CLI** – install globally with:
  ```bash
  npm install -g @angular/cli
  ```
- **.NET 8 SDK** – for building and running the API.
- **SQL Server** – ensure you have a running instance for database connectivity.

### Backend Setup (PracticeGadgetShopApi)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ab-yf/prac-gadget-shop.git
   cd prac-gadget-shop/PracticeGadgetShopApi
   ```
2. **Restore dependencies and build the project:**
   ```bash
   dotnet restore
   dotnet build
   ```
3. **Restoring the Database:**
    - To restore the SQL Server database using the backup file provided in the repository:
    Open SQL Server Management Studio (SSMS).
    - Right-click on the **Databases** node in Object Explorer and select **Restore Database...**.
    - Choose **Device** and click the browse button.
    - Add the `gadgetShop.bak` file from the `Database` folder in this repository.
    - Follow the prompts to complete the restoration process.
      
3. **Configure the Database:**
   - Update the connection string in the configuration file (e.g., *appsettings.json*) if needed.
   - Ensure that the stored procedures (`sp_SaveCustomerData`, `sp_GetCustomerData`, etc.) exist in your `gadgetShop` database.
     
4. **Run the API:**
   ```bash
   dotnet run
   ```
   
### Frontend Setup (prac-gadget-shop)

1. **Navigate to the frontend directory:**
   ```bash
   cd ../prac-gadget-shop
   ```
2. **Install npm dependencies:**
   ```bash
   npm install
   ```
3. **Run the Angular application:**
   ```bash
   ng serve
   ```
   The application will typically be served on `http://localhost:4200`.

## Usage

1. **Start the Backend:** Follow the Backend Setup instructions to run the API.
2. **Start the Frontend:** Run the Angular application.
3. **Access the Application:** Open your browser and navigate to `http://localhost:4200` to manage customer and inventory data.

## API Endpoints

The API is divided into two controllers: **CustomerController** and **InventoryController**. They follow the route pattern `api/[controller]`.

### Customer Endpoints

- **POST /api/Customer**  
  Save customer data.  
  **Payload Example:**
  ```json
  {
    "CustomerId": 1,
    "FirstName": "John",
    "LastName": "Doe",
    "Email": "john.doe@example.com",
    "Phone": "1234567890",
    "RegistrationDate": "2025-03-26"
  }
  ```

- **GET /api/Customer**  
  Retrieve all customer data.  
  **Response:** A JSON array of customer records.

- **PUT /api/Customer**  
  Update customer data.  
  **Payload Example:** Same structure as the POST endpoint.

- **DELETE /api/Customer?customerId={customerId}**  
  Delete customer data by passing the customer ID as a query parameter.

### Inventory Endpoints

- **POST /api/Inventory**  
  Save inventory data.  
  **Payload Example:**
  ```json
  {
    "ProductId": 101,
    "ProductName": "Gadget XYZ",
    "AvailableQty": 50,
    "ReOrderPoint": 10
  }
  ```

- **GET /api/Inventory**  
  Retrieve all inventory data.  
  **Response:** A JSON array of inventory records.

- **PUT /api/Inventory**  
  Update inventory data.  
  **Payload Example:** Same structure as the POST endpoint.

- **DELETE /api/Inventory?productId={productId}**  
  Delete inventory data by passing the product ID as a query parameter.

## License

*This project is licensed under the [MIT License](LICENSE) (if applicable).*  
*(If no license is provided, please update this section accordingly.)*

## Contact

For any questions, suggestions, or contributions, please feel free to reach out or open an issue in this repository.

---
