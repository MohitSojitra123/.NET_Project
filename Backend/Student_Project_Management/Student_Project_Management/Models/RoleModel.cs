using System.ComponentModel.DataAnnotations;

namespace Student_Project_Management.Models
{
    public class RoleModel
    {
            [Key]
            public int RoleId { get; set; }

            [Required]
            [StringLength(50)]
            public string RoleName { get; set; }

            [StringLength(250)]
            public string? Description { get; set; }

        public ICollection<UserRoleModel> UserRoles { get; set; }
           = new List<UserRoleModel>();
    }
}
