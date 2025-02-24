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
			return Ok(new { token });
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
