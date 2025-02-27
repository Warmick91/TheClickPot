using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TheClickPot.WebAPI.Interfaces;
using TheClickPot.WebAPI.Models;
using TheClickPot.WebAPI.Services;

namespace TheClickPot.WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly ITokenService _tokenService;

		public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenService tokenService)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_tokenService = tokenService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterDto model)
		{
			var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
			var result = await _userManager.CreateAsync(user, model.Password);

			if (!result.Succeeded) return BadRequest(result.Errors);

			return Ok(new { message = "User created successfully" });
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginDto model)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user == null) return Unauthorized("Invalid credentials");

			var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

			var token = _tokenService.GenerateToken(user);

			Response.Cookies.Append("jwt", token, new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				SameSite = SameSiteMode.None,
				Expires = DateTime.UtcNow.AddHours(3)
			});

			return Ok(new { message = "Login successful" });
		}

		[HttpPost("logout")]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync();

			Response.Cookies.Append("jwt", "", new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				SameSite = SameSiteMode.None,
				Expires = DateTime.UtcNow.AddSeconds(-1)
			});

			return Ok(new { message = "Logged out" });
		}

		[HttpGet("check-auth")]
		public IActionResult CheckAuth()
		{
			var user = HttpContext.User;
			if(user.Identity?.IsAuthenticated == true)
			{
				return Ok(new { message = "Authenticated" });
			}
			return Unauthorized();
		}
	}

	public class RegisterDto
	{
		public required string Email { get; set; }
		public required string Password { get; set; }
	}

	public class LoginDto
	{
		public required string Email { get; set; }
		public required string Password { get; set; }
	}
}
