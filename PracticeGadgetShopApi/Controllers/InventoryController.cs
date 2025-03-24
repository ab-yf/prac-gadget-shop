using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using PracticeGadgetShopApi.Models;
using System.Data;
using System.Text.Json.Serialization;

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
                // The name of our stored procedure which saves the data to our Inventory table in the database.
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

            return Ok();
        }

        [HttpGet]
        public ActionResult<InventoryDto> GetInventoryData()
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                // The name of our stored procedure which fetches the data from our Inventory table in the database.
                CommandText = "sp_GetInventoryData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            connection.Open();

            // Creating the Inventory Dto List.
            List<InventoryDto> response = new List<InventoryDto>();

            // Using the SqlDataReader, we will perform the execute reader command and shall then create an object from the Inventory Dto list storing the data which we have read.
            // We have created a seperate model to avoid confusion. If we need to perform modifications, they wouldn't carry over.
            using (SqlDataReader sqlDataReader = command.ExecuteReader())
            {
                while (sqlDataReader.Read())
                {
                    InventoryDto inventoryDto = new InventoryDto();
                    // The entire database entry table will be read with the reader, so we will just take the name of the particular column to get specific values.
                    inventoryDto.ProductId = Convert.ToInt32(sqlDataReader["ProductId"]);
                    inventoryDto.ProductName = Convert.ToString(sqlDataReader["ProductName"]);
                    inventoryDto.AvailableQty = Convert.ToInt32(sqlDataReader["AvailableQty"]);
                    inventoryDto.ReOrderPoint = Convert.ToInt32(sqlDataReader["ReOrderPoint"]);

                    // We are specifying that we want to add the inventoryDto data into our list, which we have labelled as response.
                    response.Add(inventoryDto);
                }
            }

            connection.Close();

            // We are returning the response as a JSON object, using Newtonsoft.Json.
            return Ok(JsonConvert.SerializeObject(response));
        }

        [HttpDelete]
        public ActionResult<InventoryDto> DeleteInventoryData(int productId)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=localhost\\SQLEXPRESS;Database=gadgetShop;Trusted_Connection=True;TrustServerCertificate=true"
            };

            SqlCommand command = new SqlCommand
            {
                // The name of our stored procedure which deletes the data from our Inventory table in the database.
                CommandText = "sp_DeleteInventoryData",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };

            connection.Open();

            // Our function accepts the productId as a parameter, which is then used to delete the data from the database.
            command.Parameters.AddWithValue("@ProductId", productId);

            // We are using the non-query method as we are not retrieving data, only deleting it.
            command.ExecuteNonQuery();

            connection.Close();

            // We are returning an OK status code to indicate that the data has been deleted.
            return Ok();

        }
    }

}
