using MejdisiIm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MejdisiIm.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MejdisiImContext _context;

        public UsersController(MejdisiImContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] MejdisiIm.DTOs.UserDto.RegisterRequest registerRequest)
        {
            if (_context.Users.Any(u => u.Email == registerRequest.Email))
                return BadRequest(new { message = "Email already registered." });

            var hash = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password);

            var user = new User
            {
                FullName = registerRequest.FullName,
                Email = registerRequest.Email,
                PasswordHash = hash,
                Role = registerRequest.Role ?? "Costumer"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully!", role = user.Role });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] MejdisiIm.DTOs.UserDto.LoginRequest loginRequest)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (user == null)
                return Unauthorized(new { message = "User not found" });

            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
                return Unauthorized(new { message = "Incorrect password" });

            var token = Guid.NewGuid().ToString();
            var tokenHash = BCrypt.Net.BCrypt.HashPassword(token);

            var session = new UserSession
            {
                UserId = user.UserId,
                TokenHash = tokenHash,
                ExpiresAt = DateTime.UtcNow.AddHours(6)
            };

            _context.UserSessions.Add(session);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                token,
                sessionId = session.SessionId,
                fullName = user.FullName,
                role = user.Role
            });
        }
    }
}
