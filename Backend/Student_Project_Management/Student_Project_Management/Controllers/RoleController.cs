using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Student_Project_Management.Data;
using Student_Project_Management.DTO.RoleDTO;
using Student_Project_Management.Models;
using Microsoft.EntityFrameworkCore;


namespace Student_Project_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly AppDBContext _context;

        public RoleController(AppDBContext context)
        {
            _context = context;
        }


        // =====================================================
        // GET ALL ROLES
        // GET: api/Role
        // =====================================================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleResponseDTO>>> GetAllRoles()
        {
            var roles = await _context.Roles
                .Select(r => new RoleResponseDTO
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName,
                    Description = r.Description
                })
                .ToListAsync();

            return Ok(roles);
        }


        // =====================================================
        // GET ROLE BY ID
        // GET: api/Role/1
        // =====================================================

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleResponseDTO>> GetRoleById(int id)
        {
            var role = await _context.Roles
                .Where(r => r.RoleId == id)
                .Select(r => new RoleResponseDTO
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName,
                    Description = r.Description
                })
                .FirstOrDefaultAsync();

            if (role == null)
            {
                return NotFound(new
                {
                    message = "Role not found"
                });
            }

            return Ok(role);
        }


        // =====================================================
        // ADD ROLE
        // POST: api/Role
        // =====================================================

        [HttpPost]
        public async Task<ActionResult<RoleResponseDTO>> AddRole(
            RoleRequestDTO dto)
        {
            // Check duplicate RoleName
            var roleExists = await _context.Roles
                .AnyAsync(r => r.RoleName == dto.RoleName);

            if (roleExists)
            {
                return BadRequest(new
                {
                    message = "Role already exists"
                });
            }

            var role = new RoleModel
            {
                RoleName = dto.RoleName,
                Description = dto.Description
            };

            _context.Roles.Add(role);

            await _context.SaveChangesAsync();

            var response = new RoleResponseDTO
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName,
                Description = role.Description
            };

            return CreatedAtAction(
                nameof(GetRoleById),
                new { id = role.RoleId },
                response
            );
        }


        // =====================================================
        // UPDATE ROLE
        // PUT: api/Role/1
        // =====================================================

        [HttpPut("{id}")]
        public async Task<ActionResult<RoleResponseDTO>> UpdateRole(
            int id,
            RoleRequestDTO dto)
        {
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleId == id);

            if (role == null)
            {
                return NotFound(new
                {
                    message = "Role not found"
                });
            }

            // Check duplicate RoleName
            var roleExists = await _context.Roles
                .AnyAsync(r =>
                    r.RoleName == dto.RoleName &&
                    r.RoleId != id);

            if (roleExists)
            {
                return BadRequest(new
                {
                    message = "Another role with this name already exists"
                });
            }

            role.RoleName = dto.RoleName;
            role.Description = dto.Description;

            await _context.SaveChangesAsync();

            var response = new RoleResponseDTO
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName,
                Description = role.Description
            };

            return Ok(response);
        }


        // =====================================================
        // DELETE ROLE BY ID
        // DELETE: api/Role/1
        // =====================================================

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteRole(int id)
        //{
        //    var role = await _context.Roles
        //        .FirstOrDefaultAsync(x => x.RoleId == id);

        //    if (role == null)
        //    {
        //        return NotFound(new
        //        {
        //            message = "Role not found"
        //        });
        //    }

        //    _context.Roles.Remove(role);

        //    await _context.SaveChangesAsync();

        //    return Ok(new
        //    {
        //        message = "Role deleted successfully"
        //    });
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // ==========================================
                // 1. Find Role
                // ==========================================

                var role = await _context.Roles
                    .FirstOrDefaultAsync(x => x.RoleId == id);

                if (role == null)
                {
                    return NotFound(new
                    {
                        message = "Role not found"
                    });
                }


                // ==========================================
                // 2. Find all UserRoles for this Role
                // ==========================================

                var userRoles = await _context.UserRoles
                    .Where(x => x.RoleId == id)
                    .ToListAsync();


                // ==========================================
                // 3. Get all User IDs
                // ==========================================

                var userIds = userRoles
                    .Select(x => x.UserId)
                    .Distinct()
                    .ToList();


                // ==========================================
                // 4. Find all Users
                // ==========================================

                var users = await _context.Users
                    .Where(x => userIds.Contains(x.UserId))
                    .ToListAsync();


                // ==========================================
                // 5. Delete UserRoles
                // ==========================================

                if (userRoles.Any())
                {
                    _context.UserRoles.RemoveRange(userRoles);
                }


                // ==========================================
                // 6. Delete Users
                // ==========================================

                if (users.Any())
                {
                    _context.Users.RemoveRange(users);
                }


                // ==========================================
                // 7. Delete Role
                // ==========================================

                _context.Roles.Remove(role);


                // ==========================================
                // 8. Save Changes
                // ==========================================

                await _context.SaveChangesAsync();


                // ==========================================
                // 9. Commit Transaction
                // ==========================================

                await transaction.CommitAsync();


                return Ok(new
                {
                    message = "Role and all related users deleted successfully",
                    roleId = id,
                    roleName = role.RoleName,
                    deletedUsers = userIds.Count
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return StatusCode(500, new
                {
                    message = "Error while deleting role",
                    error = ex.Message
                });
            }
        }




        // =====================================================
        // DELETE ALL ROLES
        // DELETE: api/Role
        // =====================================================

        [HttpDelete]
        public async Task<IActionResult> DeleteAllRoles()
        {
            var roles = await _context.Roles.ToListAsync();

            if (!roles.Any())
            {
                return NotFound(new
                {
                    message = "No roles found"
                });
            }

            _context.Roles.RemoveRange(roles);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "All roles deleted successfully"
            });
        }
    }
}
