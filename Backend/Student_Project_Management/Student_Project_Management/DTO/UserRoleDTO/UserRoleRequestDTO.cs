using System.ComponentModel.DataAnnotations;

namespace Student_Project_Management.DTO.UserRoleDTO
{
    public class UserRoleRequestDTO
    {
        [Required]
        public int RoleId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
