using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Domain;

namespace WebApplication2.Models
{
    public class ProductListRepresentation
    {
        public ProductListRepresentation(List<Product> products)
        {
            this.Products = products.Select(x => new ProductRepresentation(x)).ToList();
        }

        [JsonProperty(PropertyName = "products")]
        public List<ProductRepresentation> Products { get; set; }
    }
}
