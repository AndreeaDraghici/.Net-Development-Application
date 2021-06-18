using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using WebApplication2.Business;
using WebApplication2.Domain;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductRepository _repo;
        public static IWebHostEnvironment _webHostEnvironment;

        public ProductController(IProductRepository repo, IWebHostEnvironment webHostEnvironment)
        {
            _repo = repo;
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpGet]
        public async Task<ActionResult<ProductListRepresentation>> GetAllProducts()
        {
            try
            {
                var dbProducts = await _repo.GetAllProducts();
                return Ok(new ProductListRepresentation(dbProducts));

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la preluarea datelor din baza de date");
            }
        }


        [HttpGet("{productID:int}")]
        public async Task<ActionResult<ProductRepresentation>> GetProductByID(int productID)
        {
            try
            {
                var dbProduct = await _repo.GetProductByID(productID);

                if (dbProduct == null)
                {
                    return NotFound();
                }

                return new ProductRepresentation(dbProduct);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la preluarea datelor din baza de date");
            }
        }

        [HttpGet("Filter/{categoryID:int}")]
        public async Task<ActionResult<ProductListRepresentation>> GetProductByCategoryID(int categoryID)
        {

            try
            {
                var dbProducts = await _repo.GetProductByCategoryID(categoryID);
                return Ok(new ProductListRepresentation(dbProducts));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la preluarea datelor din baza de date");
            }

        }


        [HttpPost]
        public async Task<ActionResult<ProductRepresentation>> InsertProduct(Product product)
        {

            try
            {
                if (product == null)
                    return BadRequest();

                var dbProduct = await _repo.InsertProduct(product);
                return new ProductRepresentation(dbProduct);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la crearea unei noi înregistrări de produs");
            }

        }


        [HttpPut("{productID:int}")]
        public async Task<ActionResult<ProductRepresentation>> Update(int productID, Product product)
        {

            try
            {
                if (productID != product.ProductID)
                    return BadRequest("ID-ul produsului nu corespunde");
                var productToUpdate = await _repo.GetProductByID(productID);
                if (productToUpdate == null)
                    return NotFound($"Produsul cu cod-ul =  {productID} nu a fost gasitd");
                var dbProduct = await _repo.UpdateProduct(product);
                return new ProductRepresentation(dbProduct);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la actualizarea datelor");
            }

        }


        [HttpDelete("{productID:int}")]
        public async Task<ActionResult<ProductRepresentation>> Delete(int productID)
        {

            try
            {
                var productToDelete = await _repo.GetProductByID(productID);
                if (productToDelete == null)
                {
                    return NotFound($"Produsul cu cod-ul ={productID} nu a fost gasit");
                }
                var dbProduct = await _repo.DeleteProduct(productID);
                return new ProductRepresentation(dbProduct);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la stergerea datelor");
            }

        }

        [HttpPost("UploadFile/{id}")]
        public async Task<ActionResult<string>> SaveImage([FromRoute] int id, [FromForm] IFormFile imageFile)
    {

        var product = await _repo.GetProductByID(id);
        if (product == null)
            return NotFound($"Produsul cu cod-ul == {id} nu a fost gasit");

        product.ImageName = imageFile.FileName;
        await _repo.UpdateProduct(product);

        try
        {

            if (imageFile.Length > 0)
            {

                string path = _webHostEnvironment.WebRootPath + "\\uploads\\";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                using (var filestream = System.IO.File.Create(path + imageFile.FileName))
                {
                    imageFile.CopyTo(filestream);
                    filestream.Flush();
                    return "Actualizat!";
                }
            }
            else
            {
                return "Nu s-a actualizat!!";
            }
        }
        catch (Exception e)
        {
            return e.Message;
        }

    }

  }
}
