using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Domain;

namespace WebApplication2.Models
{
    public class ProductRepresentation
    {
        public ProductRepresentation(Product product)
        {
            this.ProductID = product.ProductID;
            this.Name = product.Name;
            this.Description = product.Description;
            this.Price = product.Price;
            this.BasePrice = product.BasePrice;
            this.CategoryID = product.CategoryID;
            this.ImageName = product.ImageName;
            this.ImageRoute = $"api/product/{product.ProductID}/image";
        }

        [JsonProperty(PropertyName = "productId")]
        public int ProductID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public  string Description { get; set; }

        [JsonProperty(PropertyName = "price")]
        public  decimal Price { get; set; }

        [JsonProperty(PropertyName = "basePrice")]
        public  decimal BasePrice { get; set; }

        [JsonProperty(PropertyName = "categoryId")]
        public  int CategoryID { get; set; }

        [JsonProperty(PropertyName = "imageName")]
        public string ImageName { get; set; }

        [JsonProperty(PropertyName = "imageRoute")]
        public  string ImageRoute { get; set; }


    }
}
