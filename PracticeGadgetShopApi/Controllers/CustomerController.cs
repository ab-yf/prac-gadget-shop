using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PracticeGadgetShopApi.Models;
using System.Data;

namespace PracticeGadgetShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpPost]
        public ActionResult SaveCustomerData(CustomerRequestDto requestDto)
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

            command.Parameters.AddWithValue("@CustomerId", requestDto.CustomerId); //insertion of data into our SQL database using the names in the stored procedure
            command.Parameters.AddWithValue("@FirstName", requestDto.FirstName);
            command.Parameters.AddWithValue("@LastName", requestDto.LastName);
            command.Parameters.AddWithValue("@Email", requestDto.Email);
            command.Parameters.AddWithValue("@Phone", requestDto.Phone);
            command.Parameters.AddWithValue("@RegistrationDate", requestDto.RegistrationDate);

            connection.Open();

            command.ExecuteNonQuery(); //no database retrieval, only inserting data, which is why we used non-query

            connection.Close();

            return Ok();
        }
    }
}
