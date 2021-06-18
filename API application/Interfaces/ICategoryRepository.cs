using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication2.Domain;

namespace WebApplication2.Business
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategories();
        Task<Category> GetCategoryByID(int categoryID);
        Task<Category> InsertCategory(Category category);
        Task<Category> UpdateCategory(Category category);
        Task<Category> DeleteCategory(int categoryID);
        
    }
}
