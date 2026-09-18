using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Student_Project_Management.Models;

namespace Student_Project_Management.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(UsersModel user, string roleName = "")
        {
            // The claims on the ID card (email, unique token ID, user ID, name, role)
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.FullName ?? user.Email),
                new Claim(ClaimTypes.Email, user.Email)
            };

            if (!string.IsNullOrEmpty(roleName))
            {
                claims.Add(new Claim(ClaimTypes.Role, roleName));
            }

            // Locks the card with our secret key
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)
            );
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // JwtSecurityToken: issuer, audience, claims, expiry, signingCredentials
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    double.Parse(_config["Jwt:ExpiresInMinutes"] ?? "60")),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
