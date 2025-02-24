using TheClickPot.WebAPI.Models;

namespace TheClickPot.WebAPI.Interfaces
{
	public interface ITokenService
	{
		string GenerateToken(ApplicationUser user);
	}
}
