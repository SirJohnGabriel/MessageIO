using System;
using System.ComponentModel.DataAnnotations;

namespace MessageIO.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [Required]
        public required string Username { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string PasswordHash { get; set; }
        [Required]
        public required string FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
}
