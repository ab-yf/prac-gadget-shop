using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PracticeGadgetShopApi.Models;
using System.Data;

namespace PracticeGadgetShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        [HttpPost]
        public ActionResult SaveInventoryData(InventoryRequestDto requestDto)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                CommandText = "sp_SaveInventoryData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            command.Parameters.AddWithValue("@ProductId", requestDto.ProductId); //insertion of data into our SQL database using the names in the stored procedure
            command.Parameters.AddWithValue("@ProductName", requestDto.ProductName);
            command.Parameters.AddWithValue("@AvailableQty", requestDto.AvailableQty);
            command.Parameters.AddWithValue("@ReOrderPoint", requestDto.ReOrderPoint);

            connection.Open();

            command.ExecuteNonQuery(); //no database retrieval, only inserting data, which is why we used non-query

            connection.Close();

            return Ok("Inventory Details have been saved successfully.");
        }
    }
}
