using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Business;
using WebApplication2.Domain;

namespace WebApplication2.Data
{

    public class ProductRepository : IProductRepository
    {
        private readonly ShopContext _context;
        public ProductRepository(ShopContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }


        public async Task<Product> GetProductByID(int productID)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.ProductID == productID);
        }

        public async Task<List<Product>> GetProductByCategoryID(int categoryID)
        {
            var list = await _context.Products.ToListAsync();
            return list.FindAll(x => x.CategoryID == categoryID);
        }

        public async Task<Product> InsertProduct(Product product)
        {
            var result = await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return result.Entity;
        }


        public async Task<Product> UpdateProduct(Product product)
        {
            var result = await _context.Products.FirstOrDefaultAsync(x => x.ProductID == product.ProductID);

            if (result == null)
            {
                return null;
            }

            result.ProductID = product.ProductID;
            result.Price = product.Price;
            result.Name = product.Name;
            result.ImageName = product.ImageName;
            result.Description = product.Description;
            result.CategoryID = product.CategoryID;
            result.BasePrice = product.BasePrice;
            await _context.SaveChangesAsync();
            return result;
        }


        public async Task<Product> DeleteProduct(int productID)
        {
            var result = await _context.Products.FirstOrDefaultAsync(x => x.ProductID == productID);

            if (result == null)
            {
                return null;
            }

            _context.Products.Remove(result);
            await _context.SaveChangesAsync();
            return result;
        }


    }

}
