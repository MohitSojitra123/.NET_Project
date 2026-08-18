using System.ComponentModel.DataAnnotations;

namespace Student_Project_Management.Models
{
    public class UsersModel
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(150)]
        public string FullName { get; set; }

        [Required]
        [StringLength(150)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [StringLength(15)]
        public string MobileNumber { get; set; }

        [Required]
        [StringLength(500)]
        public string ProfilePicturePath { get; set; }

        public ICollection<UserRoleModel> UserRoles { get; set; }
            = new List<UserRoleModel>();
    }
}