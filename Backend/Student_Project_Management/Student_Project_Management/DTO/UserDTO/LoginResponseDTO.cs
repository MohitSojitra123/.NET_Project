namespace Student_Project_Management.DTO.UserDTO
{
    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public UserResponseDTO User { get; set; } = null!;
        public string Role { get; set; } = string.Empty;
    }
}
