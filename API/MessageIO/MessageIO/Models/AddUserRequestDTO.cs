namespace Contactly.Models
{
    public class AddUserRequestDTO
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FirstName { get; set; }
        public string? LastName { get; set; }
    }
}