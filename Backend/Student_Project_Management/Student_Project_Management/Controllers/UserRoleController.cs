using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Student_Project_Management.Data;
using Student_Project_Management.DTO.UserRoleDTO;
using Student_Project_Management.Models;
using Microsoft.EntityFrameworkCore;


namespace Student_Project_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly AppDBContext _context;

        public UserRoleController(AppDBContext context)
        {
            _context = context;
        }


        // =====================================================
        // GET ALL USER ROLES
        // GET: api/UserRole
        // =====================================================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRoleResponseDTO>>>
            GetAllUserRoles()
        {
            var userRoles = await _context.UserRoles
                .Include(x => x.Role)
                .Include(x => x.User)
                .Select(x => new UserRoleResponseDTO
                {
                    RolePermissionId = x.RolePermissionId,

                    RoleId = x.RoleId,
                    RoleName = x.Role.RoleName,

                    UserId = x.UserId,
                    UserName = x.User.FullName,
                    Email = x.User.Email
                })
                .ToListAsync();

            return Ok(userRoles);
        }


        // =====================================================
        // GET USER ROLE BY ID
        // GET: api/UserRole/1
        // =====================================================

        [HttpGet("{id}")]
        public async Task<ActionResult<UserRoleResponseDTO>>
            GetUserRoleById(int id)
        {
            var userRole = await _context.UserRoles
                .Include(x => x.Role)
                .Include(x => x.User)
                .Where(x => x.RolePermissionId == id)
                .Select(x => new UserRoleResponseDTO
                {
                    RolePermissionId = x.RolePermissionId,

                    RoleId = x.RoleId,
                    RoleName = x.Role.RoleName,

                    UserId = x.UserId,
                    UserName = x.User.FullName,
                    Email = x.User.Email
                })
                .FirstOrDefaultAsync();

            if (userRole == null)
            {
                return NotFound(new
                {
                    message = "UserRole not found"
                });
            }

            return Ok(userRole);
        }


        // =====================================================
        // ADD USER ROLE
        // POST: api/UserRole
        // =====================================================

        [HttpPost]
        public async Task<ActionResult<UserRoleResponseDTO>>
            AddUserRole(UserRoleRequestDTO dto)
        {
            // Check Role
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleId == dto.RoleId);

            if (role == null)
            {
                return BadRequest(new
                {
                    message = "Role not found"
                });
            }


            // Check User
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == dto.UserId);

            if (user == null)
            {
                return BadRequest(new
                {
                    message = "User not found"
                });
            }


            // Check duplicate UserRole
            var alreadyExists = await _context.UserRoles
                .AnyAsync(x =>
                    x.RoleId == dto.RoleId &&
                    x.UserId == dto.UserId);

            if (alreadyExists)
            {
                return BadRequest(new
                {
                    message = "This role is already assigned to this user"
                });
            }


            var userRole = new UserRoleModel
            {
                RoleId = dto.RoleId,
                UserId = dto.UserId
            };

            _context.UserRoles.Add(userRole);

            await _context.SaveChangesAsync();


            var response = new UserRoleResponseDTO
            {
                RolePermissionId = userRole.RolePermissionId,

                RoleId = role.RoleId,
                RoleName = role.RoleName,

                UserId = user.UserId,
                UserName = user.FullName,
                Email = user.Email
            };

            return CreatedAtAction(
                nameof(GetUserRoleById),
                new { id = userRole.RolePermissionId },
                response
            );
        }


        // =====================================================
        // UPDATE USER ROLE
        // PUT: api/UserRole/1
        // =====================================================

        [HttpPut("{id}")]
        public async Task<ActionResult<UserRoleResponseDTO>>
            UpdateUserRole(
                int id,
                UserRoleRequestDTO dto)
        {
            var userRole = await _context.UserRoles
                .FirstOrDefaultAsync(x =>
                    x.RolePermissionId == id);

            if (userRole == null)
            {
                return NotFound(new
                {
                    message = "UserRole not found"
                });
            }


            // Check Role
            var role = await _context.Roles
                .FirstOrDefaultAsync(r =>
                    r.RoleId == dto.RoleId);

            if (role == null)
            {
                return BadRequest(new
                {
                    message = "Role not found"
                });
            }


            // Check User
            var user = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.UserId == dto.UserId);

            if (user == null)
            {
                return BadRequest(new
                {
                    message = "User not found"
                });
            }


            // Check duplicate
            var alreadyExists = await _context.UserRoles
                .AnyAsync(x =>
                    x.RoleId == dto.RoleId &&
                    x.UserId == dto.UserId &&
                    x.RolePermissionId != id);

            if (alreadyExists)
            {
                return BadRequest(new
                {
                    message = "This role is already assigned to this user"
                });
            }


            userRole.RoleId = dto.RoleId;
            userRole.UserId = dto.UserId;

            await _context.SaveChangesAsync();


            var response = new UserRoleResponseDTO
            {
                RolePermissionId = userRole.RolePermissionId,

                RoleId = role.RoleId,
                RoleName = role.RoleName,

                UserId = user.UserId,
                UserName = user.FullName,
                Email = user.Email
            };

            return Ok(response);
        }


        // =====================================================
        // DELETE USER ROLE BY ID
        // DELETE: api/UserRole/1
        // =====================================================

        [HttpDelete("{id}")]
        public async Task<IActionResult>
            DeleteUserRoleById(int id)
        {
            var userRole = await _context.UserRoles
                .FirstOrDefaultAsync(x =>
                    x.RolePermissionId == id);

            if (userRole == null)
            {
                return NotFound(new
                {
                    message = "UserRole not found"
                });
            }

            _context.UserRoles.Remove(userRole);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "UserRole deleted successfully"
            });
        }


        // =====================================================
        // DELETE ALL USER ROLES
        // DELETE: api/UserRole
        // =====================================================

        [HttpDelete]
        public async Task<IActionResult>
            DeleteAllUserRoles()
        {
            var userRoles = await _context.UserRoles
                .ToListAsync();

            if (!userRoles.Any())
            {
                return NotFound(new
                {
                    message = "No UserRole records found"
                });
            }

            _context.UserRoles.RemoveRange(userRoles);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "All UserRole records deleted successfully"
            });
        }
    }
}