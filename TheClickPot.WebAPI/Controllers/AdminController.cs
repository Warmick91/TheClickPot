using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheClickPot.WebAPI.Models;

namespace TheClickPot.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
		private readonly UserManager<ApplicationUser> _userManager;

		public AdminController(UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
		}

		[Authorize(Policy = "RequireAdmin")]
		[HttpGet("test-admin")]
		public IActionResult CheckAdmin()
		{
			return Ok(new { message = "You are an admin" });
		}

		[Authorize(Policy = "RequireAdmin")]
		[HttpDelete("delete-user")]
		public async Task<IActionResult> DeleteUser(int id)
		{
			var user = await _userManager.FindByIdAsync(id.ToString());
			if (user != null)
			{
				await _userManager.DeleteAsync(user);
				return Ok(new { message = "User deleted" });
			}
			else
			{
				return BadRequest("User not found");
			}
		}

		[Authorize(Policy = "RequireAdmin")]
		[HttpGet("get-all-users")]
		public async Task<IActionResult> GetAllUsers()
		{
			var users = await _userManager.Users.ToListAsync();
			return Ok(users);
		}
	}
}
