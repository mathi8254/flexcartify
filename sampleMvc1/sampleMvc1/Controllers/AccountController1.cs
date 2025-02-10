using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sampleMvc1.Data;
using sampleMvc1.Models;
using System.Security.Claims;

namespace sampleMvc1.Controllers
{
    public class AccountController : Controller
    {
        private readonly MyDbContext _context;

        public AccountController(MyDbContext context)
        {
            _context = context;
        }

        // GET: Account/Register
        public IActionResult Register()
        {
            return View();
        }

        // POST: Account/Register (User Registration)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
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
                    IsAdmin = false // Regular user
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction("Login");
            }

            return View(model);
        }

        // GET: Account/RegisterAdmin
        public IActionResult RegisterAdmin()
        {
            return View(new RegisterViewModel { IsAdmin = true }); // Pre-set IsAdmin to true
        }

        // POST: Account/RegisterAdmin
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterAdmin(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
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
                    IsAdmin = true // Set admin flag
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction("Login");
            }

            return View(model);
        }

        // GET: Account/Login
        public IActionResult Login()
        {
            return View();
        }

        // POST: Account/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => (u.Email == model.EmailOrMobile || u.Mobile == model.EmailOrMobile)
                                               && u.Password == HashPassword(model.Password)); // Use the hashing function

                if (user != null)
                {
                    // Set up authentication
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, "Login");
                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = true,
                        ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30)
                    };

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
                    return RedirectToAction("Index", "Home");
                }

                ModelState.AddModelError("", "Invalid login attempt.");
            }

            return View(model);
        }

        private string HashPassword(string password)
        {
            // Implement password hashing here
            // Use a library like BCrypt or ASP.NET Core Identity
            return password; // Placeholder: replace with actual hashing
        }
    }
}
