using Microsoft.EntityFrameworkCore;
using sampleMvc1.Models;
using static NuGet.Packaging.PackagingConstants;

namespace sampleMvc1.Data
{

    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; } // Add this line for User management

        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<WishList> WishLists { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .OwnsOne(p => p.Price, price =>
                {
                    price.Property(p => p.Old)
                         .HasColumnType("decimal(18,2)");

                    price.Property(p => p.New)
                         .HasColumnType("decimal(18,2)");
                });
        }

    }



}
