using Contactly.Models;
using MessageIO.Data;
using MessageIO.Models;
using MessageIO.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MessageIO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public UserController(AppDbContext dbContext)
        {
           this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetActionResult() {
            var users = dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpPost]
        public IActionResult AddUser(AddUserRequestDTO request)
        {
            if (dbContext.Users.Any(u => u.Email == request.Email || u.Username == request.Username))
            {
                return BadRequest("User with this email or username already exists.");
            }

            var modelUser = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = PasswordHasher.HashPassword(request.PasswordHash),
                CreatedAt = DateTime.UtcNow
            };
            var hasher = new PasswordHasher<User>();


            dbContext.Users.Add(modelUser);
            dbContext.SaveChanges();

            return Ok(modelUser);
        }

        [HttpDelete]
        public IActionResult RemoveUser(Guid id)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            dbContext.Users.Remove(user);
            dbContext.SaveChanges();

            return Ok(user);
        }

        [HttpPut]
        public IActionResult UpdateUser(Guid id, [FromBody] UpdateUserRequestDTO request)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (!string.IsNullOrWhiteSpace(request.Username) && request.Username != user.Username)
            {
                if (dbContext.Users.Any(u => u.Username == request.Username))
                    return BadRequest("Username already exists");
                user.Username = request.Username;
            }

            if (!string.IsNullOrWhiteSpace(request.Email) && request.Email != user.Email)
            {
                if (dbContext.Users.All(u => u.Email == request.Email))
                    return BadRequest("Email already exists");
                user.Email = request.Email;
            }

            user.FirstName = request.FirstName ?? user.FirstName;
            user.LastName = request.LastName ?? user.LastName;

            if (!string.IsNullOrWhiteSpace(request.PasswordHash))
            {

                user.PasswordHash = PasswordHasher.HashPassword(request.PasswordHash);
            }

            dbContext.SaveChanges();

            return Ok(user);
        }
        
    }
}
