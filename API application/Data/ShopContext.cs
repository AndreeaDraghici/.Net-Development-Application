using Microsoft.EntityFrameworkCore;
using WebApplication2.Domain;

namespace WebApplication2.Data
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options) :
            base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

    }
}