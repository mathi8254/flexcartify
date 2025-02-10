using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sampleMvc1.Data;
using sampleMvc1.Models;
using System.Collections.Generic;
using System.Linq;

namespace sampleApiV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OrdersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrders()
        {
            return _context.Orders.Include(o => o.Items).ToList();
        }


        // POST: api/orders
        [HttpPost]
        public ActionResult<Order> PostOrder(Order order)
        {
            // Validate the model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Optionally validate order items
                if (order.Items != null)
                {
                    foreach (var item in order.Items)
                    {
                        // You may want to validate each item here as well
                        _context.OrderItems.Add(item); // Ensure you are also adding items if necessary
                    }
                }

                _context.Orders.Add(order);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetOrders), new { id = order.OrderId }, order);
            }
            catch (DbUpdateException ex)
            {
                // Log the exception (ex) here if necessary
                return StatusCode(500, "An error occurred while saving the order. Please try again later.");
            }
        }

        [HttpGet("SalesReports")]
        public IActionResult GetSalesReport(DateTime startDate, DateTime endDate)
        {
            // Validate the date range
            if (endDate < startDate)
            {
                return BadRequest("End date must be greater than or equal to start date.");
            }

            // Log the incoming dates
            Console.WriteLine($"Fetching sales report from {startDate} to {endDate}");

            var orders = _context.Orders
                .Include(o => o.Items)
                .Where(o => o.OrderDate >= startDate && o.OrderDate < endDate.AddDays(1)) // Include all of the end date
                .ToList();

            // Log the number of orders found
            Console.WriteLine($"Orders found: {orders.Count}");

            if (!orders.Any())
            {
                return NotFound("No orders found for the specified date range.");
            }

            // Generate the report...
            var report = new
            {
                TotalOrders = orders.Count,
                TotalAmount = orders.Sum(o => o.TotalAmount),
                TotalDiscount = orders.Sum(o => o.DiscountAmount),
                Orders = orders.Select(o => new
                {
                    o.OrderId,
                    o.OrderDate,
                    o.CustomerName,
                    o.TotalAmount,
                    o.DiscountAmount,
                    Items = o.Items.Select(i => new
                    {
                        i.ProductId,
                        i.Quantity,
                        i.Price
                    })
                })
            };

            return Ok(report);
        }



    }
}
