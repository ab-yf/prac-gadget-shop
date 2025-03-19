--- 

# Gadget Shop Inventory Management System

A full-stack CRUD application for managing gadget inventory, built with Angular 19, .NET 8, and SQL Server.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview

The Gadget Shop Inventory Management System is designed to help manage gadget inventories efficiently. It provides functionalities to create, read, update, and delete (CRUD) gadget information, ensuring seamless inventory management.

## Features

- **Add New Gadgets**: Input details like name, category, price, and quantity.
- **View Gadget List**: Display all gadgets with sorting and filtering options.
- **Update Gadget Information**: Modify existing gadget details.
- **Delete Gadgets**: Remove gadgets from the inventory.
- **Search Functionality**: Quickly find gadgets using keywords.

## Technologies Used

- **Frontend**: Angular 19
- **Backend**: .NET 8 (ASP.NET Core)
- **Database**: SQL Server
- **Version Control**: Git

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **Angular CLI**: Install globally using `npm install -g @angular/cli`
- **.NET 8 SDK**: [Download .NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- **SQL Server**: Ensure SQL Server is installed and running.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ab-yf/prac-gadget-shop.git
   cd prac-gadget-shop
   ```

2. **Setup the Backend**:

    - Navigate to the backend directory:

      ```bash
      cd PracticeGadgetShopApi
      ```

    - Restore .NET dependencies:

      ```bash
      dotnet restore
      ```

    - Update the `appsettings.json` file with your SQL Server connection string.

    - Apply migrations to set up the database:

      ```bash
      dotnet ef database update
      ```

    - Run the backend server:

      ```bash
      dotnet run
      ```

3. **Setup the Frontend**:

    - Navigate to the frontend directory:

      ```bash
      cd ../prac-gadget-shop
      ```

    - Install Angular dependencies:

      ```bash
      npm install
      ```

    - Run the frontend application:

      ```bash
      ng serve
      ```

    - Open your browser and navigate to `http://localhost:4200`.

## Project Structure

```bash
prac-gadget-shop/
├── .gitignore
├── README.md
├── PracticeGadgetShopApi/    # .NET Backend
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── ...
└── prac-gadget-shop/         # Angular Frontend
    ├── src/
    ├── angular.json
    └── ...
```

## Usage

1. **Add Gadgets**: Use the "Add Gadget" form to input new gadget details.
2. **View Gadgets**: The homepage displays the list of all gadgets.
3. **Edit Gadgets**: Click on a gadget to edit its information.
4. **Delete Gadgets**: Use the delete option to remove a gadget from the inventory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---