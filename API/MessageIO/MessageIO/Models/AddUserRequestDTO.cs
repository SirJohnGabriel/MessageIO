using System.ComponentModel.DataAnnotations;

namespace Contactly.Models
{
    public class AddUserRequestDTO
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; }

        public string? LastName { get; set; }
    }
}