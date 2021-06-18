using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Business;
using WebApplication2.Domain;

namespace WebApplication2.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ShopContext _context;
        public CategoryRepository(ShopContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories.Include(c => c.Products).ToListAsync();
        }

        public async Task<Category> GetCategoryByID(int categoryID)
        {
            return await _context.Categories.Include(c => c.Products).FirstOrDefaultAsync(x => x.CategoryID == categoryID);
        }

        public async Task<Category> InsertCategory(Category category)
        {
            var result = await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Category> UpdateCategory(Category category)
        {
            var result = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryID == category.CategoryID);

            if (result == null)
            {
                return null;
            }

            result.CategoryID = category.CategoryID;
            result.Name = category.Name;
            result.Products = category.Products;
            result.Description = category.Description;

            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Category> DeleteCategory(int categoryID)
        {
            var result = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryID == categoryID);

            if (result == null)
            {
                return null;
            }

            _context.Categories.Remove(result);
            await _context.SaveChangesAsync();
            return result;
        }

    }
}
