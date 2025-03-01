using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TheClickPot.WebAPI.Interfaces;
using TheClickPot.WebAPI.Models;

namespace TheClickPot.WebAPI.Services
{
	public class TokenService : ITokenService
	{
		private readonly IConfiguration _config;
		private readonly UserManager<ApplicationUser> _userManager;

		public TokenService(IConfiguration config, UserManager<ApplicationUser> userManager)
		{
			_config = config;
			_userManager = userManager;
		}

		public async Task<string> GenerateToken(ApplicationUser user)
		{
			var secretKey = _config["JwtSettings:Secret"];
			var issuer = _config["JwtSettings:Issuer"];
			var audience = _config["JwtSettings:Audience"];

			if (string.IsNullOrEmpty(secretKey))
			{
				throw new Exception("Can not generate a JWT Token: JWT Secret Key is missing from configuration.");
			}

			var key = Encoding.UTF8.GetBytes(secretKey);

			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Id),
				new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			var roles = await _userManager.GetRolesAsync(user);
			
			foreach(var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}

			if (string.IsNullOrEmpty(issuer))
			{
				throw new ArgumentException("Can not generate a JWT Token: Issuer is missing from configuration.");
			}
			if (string.IsNullOrEmpty(audience))
			{
				throw new ArgumentException("Can not generate a JWT Token: Audience is missing from configuration.");
			}

			var token = new JwtSecurityToken(
				issuer: issuer,
				audience: audience,
				claims: claims,
				expires: DateTime.UtcNow.AddHours(3),
				signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
				);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
