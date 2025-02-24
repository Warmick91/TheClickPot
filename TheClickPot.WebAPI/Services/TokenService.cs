using Microsoft.IdentityModel.Tokens;
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

		public TokenService(IConfiguration config)
		{
			_config = config;
		}

		public string GenerateToken(ApplicationUser user)
		{
			var secretKey = _config["JwtSettings:Secret"];
			var issuer = _config["JwtSettings:Issuer"];
			var audience = _config["JwtSettings:Audience"];

			if (string.IsNullOrEmpty(secretKey))
			{
				throw new Exception("Can not generate a JWT Token: JWT Secret Key is missing from configuration.");
			}

			var key = Encoding.UTF8.GetBytes(secretKey);

			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Id),
				new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			if (string.IsNullOrEmpty(issuer))
			{
				throw new Exception("Can not generate a JWT Token: Issuer is missing from configuration.");
			}
			if (string.IsNullOrEmpty(audience))
			{
				throw new Exception("Can not generate a JWT Token: Audience is missing from configuration.");
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
