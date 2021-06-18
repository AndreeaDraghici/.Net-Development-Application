using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication2.Domain;

namespace WebApplication2.Business
{
    public interface IProductRepository
    {

        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductByID(int productID);
        Task<List<Product>> GetProductByCategoryID(int categoryID);
        Task<Product> InsertProduct(Product product);
        Task<Product> UpdateProduct(Product product);
        Task<Product> DeleteProduct(int productID);

    }
}
