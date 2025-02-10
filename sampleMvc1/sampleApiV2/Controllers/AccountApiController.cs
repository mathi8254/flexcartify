using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sampleMvc1.Data;
using sampleMvc1.Models;

namespace sampleApiV2.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccountApiController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AccountApiController(MyDbContext context)
        {
            _context = context;
        }

        // POST: api/account/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                City = model.City,
                Pincode = model.Pincode,
                Mobile = model.Mobile,
                Email = model.Email,
                Password = HashPassword(model.Password), // Hash the password
                IsAdmin = model.IsAdmin // Regular user
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Login), new { emailOrMobile = model.Email }, null); // Change as needed
        }

        // POST: api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => (u.Email == model.EmailOrMobile || u.Mobile == model.EmailOrMobile)
                                           && u.Password == HashPassword(model.Password));

            if (user == null)
            {
                return Unauthorized();
            }

            // You can return user information or a token here as needed
            return Ok(new { user.Id, user.Email, user.IsAdmin });
        }

        private string HashPassword(string password)
        {
            // Implement password hashing here
            return password; // Placeholder: replace with actual hashing
        }
    }
}
