using TheClickPot.WebAPI.Models;

namespace TheClickPot.WebAPI.Interfaces
{
	public interface ITokenService
	{
		Task<string> GenerateToken(ApplicationUser user);
	}
}
