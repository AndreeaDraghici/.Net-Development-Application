using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApplication2.Business;
using WebApplication2.Domain;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repo;

        public CategoryController(ICategoryRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<CategoryListRepresentation>> GetAllCategories()
        {
            try
            {
                var dbCategories = await _repo.GetAllCategories();
                return Ok(new CategoryListRepresentation(dbCategories));

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la preluarea datelor din baza de date");
            }
        }


        [HttpGet("{categoryID:int}")]
        public async Task<ActionResult<CategoryRepresentation>> GetCategoryByID(int categoryID)
        {
            try
            {
                var dbCategory = await _repo.GetCategoryByID(categoryID);

                if (dbCategory == null)
                {
                    return NotFound();
                }

                return new CategoryRepresentation(dbCategory);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la preluarea datelor din baza de date");
            }
        }

        [HttpPost]
        public async Task<ActionResult<CategoryRepresentation>> InsertCategory(Category category)
        {

            try
            {
                if (category == null)
                    return BadRequest();
                var dbCategory = await _repo.InsertCategory(category);
                return new CategoryRepresentation(dbCategory);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la crearea unei noi înregistrări de produs");
            }

        }


        [HttpPut("{categoryID:int}")]
        public async Task<ActionResult<CategoryRepresentation>> Update(int categoryID, Category category)
        {

            try
            {
                if (categoryID != category.CategoryID)
                    return BadRequest("ID-ul produsului nu corespunde");
                var categoryToUpdate = await _repo.GetCategoryByID(categoryID);
                if (categoryToUpdate == null)
                    return NotFound($"Produsul cu cod-ul = {categoryID} nu a fost gasit");
                var dbCategory = await _repo.UpdateCategory(category);
                return new CategoryRepresentation(dbCategory);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la actualizarea datelor");
            }

        }

        [HttpDelete("{categoryID:int}")]
        public async Task<ActionResult<CategoryRepresentation>> Delete(int categoryID)
        {

            try
            {
                var categoryToDelete = await _repo.GetCategoryByID(categoryID);
                if (categoryToDelete == null)
                {
                    return NotFound($"Produsul cu cod-ul = {categoryID} nu a fost gasit");
                }
                var dbCategory = await _repo.DeleteCategory(categoryID);
                return new CategoryRepresentation(dbCategory);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Eroare la stergerea datelor");
            }

        }

    }
}
