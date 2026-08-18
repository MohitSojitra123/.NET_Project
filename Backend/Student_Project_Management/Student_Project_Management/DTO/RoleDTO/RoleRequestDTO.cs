using System.ComponentModel.DataAnnotations;

namespace Student_Project_Management.DTO.RoleDTO
{
    public class RoleRequestDTO
    {
            [Required]
            [StringLength(50)]
            public string RoleName { get; set; }

            [StringLength(250)]
            public string? Description { get; set; }
        
    }
}
