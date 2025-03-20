namespace PracticeGadgetShopApi.Models
{
    public class InventoryDto
    {
        #region Properties
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int AvailableQty { get; set; }
        public int ReOrderPoint { get; set; }
        #endregion
    }
}
