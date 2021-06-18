using Newtonsoft.Json;
using System.Collections.Generic;
using WebApplication2.Domain;

namespace WebApplication2.Models
{
    public class CategoryRepresentation
    {
        public CategoryRepresentation(Category category)
        {
            this.CategoryID = category.CategoryID;
            this.Name = category.Name;
            this.Description = category.Description;
            this.Products = category.Products;
        }

        [JsonProperty(PropertyName = "categoryId")]
        public int CategoryID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public  string Description { get; set; }

        [JsonProperty(PropertyName = "products")]
        public ICollection<Product> Products { get; set; }

    }

}
