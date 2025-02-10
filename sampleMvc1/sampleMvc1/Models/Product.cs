using CsvHelper.Configuration.Attributes; // Ensure this is included
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace sampleMvc1.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ListItem { get; set; }
        public Price Price { get; set; } // This will be a complex type
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
        public bool Discount { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a non-negative number.")]
        public int Quantity { get; set; }
    }

    [Owned] // This indicates that Price is a complex type
    public class Price
    {
        [Name("Old Price")] // This uses the Name attribute from CsvHelper
        public decimal Old { get; set; }

        [Name("New Price")] // This uses the Name attribute from CsvHelper
        public decimal New { get; set; }
    }
}
