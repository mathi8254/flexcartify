﻿namespace sampleMvc1.Models
{
    public class CartItem
    {
        
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

       // public virtual Product Product { get; set; }
    }
}
