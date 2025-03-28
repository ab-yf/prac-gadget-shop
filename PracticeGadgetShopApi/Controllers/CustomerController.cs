﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using PracticeGadgetShopApi.Models;
using System.Data;

namespace PracticeGadgetShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpPost]
        public ActionResult SaveCustomerData(CustomerRequestDto customerRequest)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                // The name of our stored procedure which saves the Customer Details/Data to our Customer table in the database.
                CommandText = "sp_SaveCustomerData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            command.Parameters.AddWithValue("@CustomerId", customerRequest.CustomerId); // Insertion of data into our SQL database using the names in the stored procedure
            command.Parameters.AddWithValue("@FirstName", customerRequest.FirstName);
            command.Parameters.AddWithValue("@LastName", customerRequest.LastName);
            command.Parameters.AddWithValue("@Email", customerRequest.Email);
            command.Parameters.AddWithValue("@Phone", customerRequest.Phone);
            command.Parameters.AddWithValue("@RegistrationDate", customerRequest.RegistrationDate);

            connection.Open();

            command.ExecuteNonQuery(); // No database retrieval, only inserting data, which is why we used non-query

            connection.Close();

            return Ok();
        }
        [HttpGet]
        public ActionResult GetCustomerData()
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                // The name of our stored procedure which gets the Customer Details/Data from our Customer table in the database.
                CommandText = "sp_GetCustomerData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            connection.Open();

            List<CustomerDto> customerList = new List<CustomerDto>();

            using (SqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    CustomerDto customerDto = new CustomerDto();
                    customerDto.CustomerId = Convert.ToInt32(reader["CustomerId"]);
                    customerDto.FirstName = Convert.ToString(reader["FirstName"].ToString());
                    customerDto.LastName = Convert.ToString(reader["LastName"].ToString());
                    customerDto.Email = Convert.ToString(reader["Email"].ToString());
                    customerDto.Phone = Convert.ToString(reader["Phone"].ToString());
                    customerDto.RegistrationDate = Convert.ToString(reader["RegistrationDate"]);

                    customerList.Add(customerDto);
                }
            }

            connection.Close();

            return Ok(JsonConvert.SerializeObject(customerList));
        }
        [HttpDelete]
        public ActionResult DeleteCustomerData(int customerId)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                // The name of our stored procedure which deletes the Customer Details/Data from our Customer table in the database.
                CommandText = "sp_DeleteCustomerData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            // The parameter we are passing to the stored procedure to delete the customer data
            command.Parameters.AddWithValue("@CustomerId", customerId); 

            connection.Open();

            command.ExecuteNonQuery(); // No database retrieval, only inserting data, which is why we used non-query

            connection.Close();

            return Ok();
        }

        [HttpPut]
        // We are accepting a paramter called customerRequest according to the CustomerRequestDto model.
        public ActionResult<CustomerDto> UpdateCustomerData(CustomerRequestDto customerRequest)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                // The name of our stored procedure which updates the data from our Customer table in the database.
                CommandText = "sp_UpdateCustomerData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            connection.Open();

            // Our function accepts the customerId as a parameter, which is then used to update the data from the database.
            // Updating of data into our SQL database using the names in the stored procedure
            command.Parameters.AddWithValue("@CustomerId", customerRequest.CustomerId);
            command.Parameters.AddWithValue("@FirstName", customerRequest.FirstName);
            command.Parameters.AddWithValue("@LastName", customerRequest.LastName);
            command.Parameters.AddWithValue("@Email", customerRequest.Email);
            command.Parameters.AddWithValue("@Phone", customerRequest.Phone);
            command.Parameters.AddWithValue("@RegistrationDate", customerRequest.RegistrationDate);

            // We are using the non-query method as we are not retrieving data, only updating it.
            command.ExecuteNonQuery();

            connection.Close();

            // We are returning an OK status code to indicate that the data has been updated.
            return Ok();

        }
    }
}
