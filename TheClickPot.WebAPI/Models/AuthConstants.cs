namespace TheClickPot.WebAPI.Models
{
	public static class AuthConstants
	{
		public static class Roles
		{
			public const string Admin = "Admin";
			public const string Manager = "Manager";
			public const string User = "User";
		}

		public static class Policies
		{
			public const string RequireAdmin = "RequireAdmin";
			public const string RequireManager = "RequireManager";
		}
		
	}
}
