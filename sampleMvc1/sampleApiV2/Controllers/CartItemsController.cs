using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sampleMvc1.Data;
using sampleMvc1.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sampleApiV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CartItemController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Cart/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart(int userId)
        {
            var cartItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return cartItems;
        }

        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart(CartItem cartItem)
        {
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == cartItem.UserId && c.ProductId == cartItem.ProductId);

            if (existingItem != null)
            {
                // Update quantity if already in the cart
                existingItem.Quantity += cartItem.Quantity;
                _context.Entry(existingItem).State = EntityState.Modified;
            }
            else
            {
                // Add new cart item
                _context.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCart), new { userId = cartItem.UserId }, cartItem);
        }

        // PUT: api/Cart/{userId}/{productId}
        [HttpPut("{userId}/{productId}")]
        public async Task<IActionResult> UpdateCart(int userId, int productId, [FromBody] CartItem cartItem)
        {
            // Check if the cart item exists
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(item => item.UserId == userId && item.ProductId == productId);

            if (existingItem == null)
            {
                return NotFound(); // Or handle this as needed
            }

            // Update properties
            existingItem.Quantity = cartItem.Quantity;
            _context.CartItems.Update(existingItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Cart/{userId}/{productId}
        [HttpDelete("{userId}/{productId}")]
        public async Task<IActionResult> RemoveFromCart(int userId, int productId)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
