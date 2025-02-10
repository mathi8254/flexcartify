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
    public class WishListController : ControllerBase
    {
        private readonly MyDbContext _context;

        public WishListController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/WishList/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishList(int userId)
        {
            var wishListItems = await _context.WishLists
                .Where(w => w.UserId == userId)
                .ToListAsync();

            if (wishListItems == null || !wishListItems.Any())
            {
                return NotFound("No items found in the wishlist for this user.");
            }

            return Ok(wishListItems);
        }

        // POST: api/WishList
        [HttpPost]
        public async Task<ActionResult<WishList>> AddToWishList([FromBody] WishList wishListItem)
        {
            if (wishListItem == null)
            {
                return BadRequest("Invalid wishlist item.");
            }

            // Check if the item already exists in the wishlist
            var existingItem = await _context.WishLists
                .FirstOrDefaultAsync(w => w.UserId == wishListItem.UserId && w.ProductId == wishListItem.ProductId);

            if (existingItem != null)
            {
                return Conflict("Item already exists in the wishlist.");
            }

            // Add new wishlist item
            _context.WishLists.Add(wishListItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWishList), new { userId = wishListItem.UserId }, wishListItem);
        }

        // DELETE: api/WishList/{userId}/{productId}
        [HttpDelete("{userId}/{productId}")]
        public async Task<IActionResult> RemoveFromWishList(int userId, int productId)
        {
            var wishListItem = await _context.WishLists
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

            if (wishListItem == null)
            {
                return NotFound("Wishlist item not found.");
            }

            _context.WishLists.Remove(wishListItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
