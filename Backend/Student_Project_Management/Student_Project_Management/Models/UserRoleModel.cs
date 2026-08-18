using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_Project_Management.Models
{
    public class UserRoleModel
    {

        [Key]
        public int RolePermissionId { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public int UserId { get; set; }

        // Foreign Key → Role
        [ForeignKey("RoleId")]
        public RoleModel Role { get; set; }

        // Foreign Key → User
        [ForeignKey("UserId")]
        public UsersModel User { get; set; }

        

    }
}
