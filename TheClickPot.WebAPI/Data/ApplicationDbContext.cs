using Microsoft.EntityFrameworkCore;

namespace TheClickPot.WebAPI.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
			
		}
	}
}
