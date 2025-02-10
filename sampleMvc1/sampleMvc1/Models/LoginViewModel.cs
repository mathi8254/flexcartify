using System.ComponentModel.DataAnnotations;

namespace sampleMvc1.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email or Mobile is required.")]
        public string EmailOrMobile { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
