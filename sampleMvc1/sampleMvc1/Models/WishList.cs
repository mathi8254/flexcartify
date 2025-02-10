using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampleMvc1.Models
{
    public class WishList
    {
        [Key] // Correct attribute
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // This indicates that the database generates this value

        public int Id { get; set; } // Database will auto-generate this

        public int UserId { get; set; }
        public int ProductId { get; set; }
    }
}
