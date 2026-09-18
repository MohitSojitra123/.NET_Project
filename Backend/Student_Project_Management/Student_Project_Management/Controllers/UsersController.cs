using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_Project_Management.Data;
using Student_Project_Management.DTO.UserDTO;
using Student_Project_Management.Models;
using Student_Project_Management.Services;

namespace Student_Project_Management.Controllers
{
    [Route("api/[controller]")]
    [Route("api/User")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly TokenService _tokenService;

        public UsersController(AppDBContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // ============================================
        // LOGIN (PUBLIC)
        // POST: api/Users/login or api/User/login
        // ============================================
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Query user matching Email and Password, including Role
                var user = await _context.Users
                    .Include(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .SingleOrDefaultAsync(u =>
                        u.Email.ToLower() == dto.Email.ToLower() &&
                        u.Password == dto.Password);

                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid Email or password" });
                }

                var roleName = user.UserRoles.FirstOrDefault()?.Role?.RoleName ?? "Student";
                var token = _tokenService.GenerateToken(user, roleName);

                return Ok(new
                {
                    token = token,
                    user = new
                    {
                        userId = user.UserId,
                        fullName = user.FullName,
                        email = user.Email,
                        mobileNumber = user.MobileNumber,
                        profilePicturePath = user.ProfilePicturePath,
                        role = roleName
                    },
                    role = roleName
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Something went wrong: " + ex.Message });
            }
        }

        // ============================================
        // CURRENT USER PROFILE (PROTECTED)
        // GET: api/Users/me
        // ============================================
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value
                         ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized(new { message = "Invalid token claims" });
            }

            var user = await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .SingleOrDefaultAsync(u => u.Email.ToLower() == userEmail.ToLower());

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var roleName = user.UserRoles.FirstOrDefault()?.Role?.RoleName ?? "Student";

            return Ok(new
            {
                userId = user.UserId,
                fullName = user.FullName,
                email = user.Email,
                mobileNumber = user.MobileNumber,
                profilePicturePath = user.ProfilePicturePath,
                role = roleName
            });
        }

        // ============================================
        // GET ALL USERS (PROTECTED)
        // GET: api/Users
        // ============================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDTO>>> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new UserResponseDTO
                {
                    UserId = u.UserId,
                    FullName = u.FullName,
                    Email = u.Email,
                    MobileNumber = u.MobileNumber,
                    ProfilePicturePath = u.ProfilePicturePath
                })
                .ToListAsync();

            return Ok(users);
        }

        // ============================================
        // GET USER BY ID (PROTECTED)
        // GET: api/Users/1
        // ============================================
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDTO>> GetUserById(int id)
        {
            var user = await _context.Users
                .Where(u => u.UserId == id)
                .Select(u => new UserResponseDTO
                {
                    UserId = u.UserId,
                    FullName = u.FullName,
                    Email = u.Email,
                    MobileNumber = u.MobileNumber,
                    ProfilePicturePath = u.ProfilePicturePath
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            return Ok(user);
        }

        // ============================================
        // CREATE USER (ADMIN ONLY)
        // POST: api/Users
        // ============================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<UserResponseDTO>> CreateUser(
            UserCreateDTO dto)
        {
            var emailExists = await _context.Users
                .AnyAsync(u => u.Email == dto.Email);

            if (emailExists)
            {
                return BadRequest(new
                {
                    message = "Email already exists"
                });
            }

            var user = new UsersModel
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = dto.Password,
                MobileNumber = dto.MobileNumber,
                ProfilePicturePath = dto.ProfilePicturePath
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            var response = new UserResponseDTO
            {
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                MobileNumber = user.MobileNumber,
                ProfilePicturePath = user.ProfilePicturePath
            };

            return CreatedAtAction(
                nameof(GetUserById),
                new { id = user.UserId },
                response
            );
        }

        // ============================================
        // UPDATE USER (ADMIN ONLY)
        // PUT: api/Users/1
        // ============================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(
            int id,
            UserUpdateDTO dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            var emailExists = await _context.Users
                .AnyAsync(u =>
                    u.Email == dto.Email &&
                    u.UserId != id);

            if (emailExists)
            {
                return BadRequest(new
                {
                    message = "Email already exists"
                });
            }

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                user.Password = dto.Password;
            }
            user.MobileNumber = dto.MobileNumber;
            user.ProfilePicturePath = dto.ProfilePicturePath;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User updated successfully"
            });
        }

        // ============================================
        // DELETE USER (ADMIN ONLY)
        // DELETE: api/Users/1
        // ============================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User deleted successfully"
            });
        }
    }
}
