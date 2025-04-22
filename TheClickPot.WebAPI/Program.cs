using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Azure.Monitor.OpenTelemetry.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TheClickPot.WebAPI.Data;
using TheClickPot.WebAPI.Interfaces;
using TheClickPot.WebAPI.Models;
using TheClickPot.WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

var openTelemetryBuilder = builder.Services.AddOpenTelemetry();
var connectionString = builder.Configuration["AzureMonitor:ConnectionString"];

openTelemetryBuilder.UseAzureMonitor(options =>
{
	if (builder.Environment.IsDevelopment() && !string.IsNullOrWhiteSpace(connectionString))
	{
		options.ConnectionString = connectionString;
	}
	// If no connection string is set, OpenTelemetry will use the default Azure Monitor settings.
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Authentication
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"];
if (string.IsNullOrEmpty(secretKey))
{
	throw new Exception("JWT Secret Key is missing from configuration.");
}
var key = Encoding.UTF8.GetBytes(secretKey);

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	options.RequireHttpsMetadata = false;
	options.SaveToken = true;
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(key),
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidIssuer = jwtSettings["Issuer"],
		ValidAudience = jwtSettings["Audience"],
		ValidateLifetime = true
	};

	options.Events = new JwtBearerEvents
	{
		OnMessageReceived = context =>
		{
			var token = context.Request.Cookies["jwt"];
			if (!string.IsNullOrEmpty(token))
			{
				context.Token = token;
			}
			return Task.CompletedTask;
		}
	};
});

builder.Services.AddAuthorizationBuilder()
	.AddPolicy(
	"RequireAdmin",
	policy => policy.RequireRole(AuthConstants.Roles.Admin)
	);

// Cors
builder.Services.AddCors(options =>
{
	//TODO: Check how to secure WithOrigins() for Production
	options.AddPolicy("AllowAngular",
		builder => builder.WithOrigins(
			"https://white-stone-0d26b6410.4.azurestaticapps.net",
			"http://localhost:4200",
			"https://localhost:7207"
			)
		.AllowCredentials()
		.AllowAnyMethod()
		.AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
	"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
	var forecast = Enumerable.Range(1, 5).Select(index =>
		new WeatherForecast
		(
			DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
			Random.Shared.Next(-20, 55),
			summaries[Random.Shared.Next(summaries.Length)]
		))
		.ToArray();
	return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

#region TODO: This section can be safely removed after an administration system has been implemented

// Create a service scope for program.cs (otherwise we can't inject services)
var scope = app.Services.CreateScope();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

string[] roleNames = { AuthConstants.Roles.Admin, AuthConstants.Roles.Admin, AuthConstants.Roles.Manager };

foreach (var roleName in roleNames)
{
	if (!await roleManager.RoleExistsAsync(roleName))
	{
		await roleManager.CreateAsync(new IdentityRole(roleName));
	}
}

#endregion


app.MapControllers();
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
	public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
