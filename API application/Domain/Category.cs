using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Domain
{
    public class Category
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CategoryID { get; set; }
        public virtual string Name { get; set; }
        [ForeignKey("CategoryID")]
        public virtual ICollection<Product> Products { get; set; }
        public virtual string Description { get; set; }

    }
}
