using Contactly.Models;
using MessageIO.Data;
using MessageIO.Helpers;
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
        private readonly TokenProvider tokenProvider;

        public UserController(AppDbContext dbContext, TokenProvider tokenProvider)
        {
           this.dbContext = dbContext;
            this.tokenProvider = tokenProvider;
        }

        [HttpGet]
        public IActionResult GetActionResult() {
            var users = dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpPost("register")]
        public IActionResult AddUser(AddUserRequestDTO request)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var errors = new Dictionary<string, string>();

            if (dbContext.Users.Any(u => u.Email == request.Email))
            {
                errors["email"] = "User with this email already exists.";
            }
            if (dbContext.Users.Any(u => u.Username == request.Username))
            {
                errors["username"] = "User with this username already exists.";
            }

            if (errors.Count > 0)
            {
                return BadRequest(errors);
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
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO request)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Email == request.Identifier || u.Username == request.Identifier);

            if (user == null)
                return NotFound("User not found.");

            if (!PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized("Invalid Password");

            string token = tokenProvider.Create(user);

            return Ok(new { Token = token, User = new { user.Id, user.Username, user.Email, user.FirstName, user.LastName }, userId = user.Id, });
        }
    }

}
