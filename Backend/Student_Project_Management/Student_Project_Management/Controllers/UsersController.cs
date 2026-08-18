using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_Project_Management.Data;
using Student_Project_Management.DTO.UserDTO;
using Student_Project_Management.Models;

namespace Student_Project_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDBContext _context;

        public UsersController(AppDBContext context)
        {
            _context = context;
        }


        // GET ALL USERS
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
        // GET USER BY ID
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
        // CREATE USER
        // POST: api/Users
        // ============================================

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
        // UPDATE USER
        // PUT: api/Users/1
        // ============================================

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
            user.Password = dto.Password;
            user.MobileNumber = dto.MobileNumber;
            user.ProfilePicturePath = dto.ProfilePicturePath;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User updated successfully"
            });
        }


        // ============================================
        // DELETE USER
        // DELETE: api/Users/1
        // ============================================

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
