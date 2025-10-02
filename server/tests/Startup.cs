using dataaccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using api;

namespace tests;

public class Startup
{
    private readonly PostgreSqlContainer _dbContainer;

    public Startup()
    {
        _dbContainer = new PostgreSqlBuilder()
            .WithDatabase("testdb")
            .WithUsername("postgres")
            .WithPassword("postgres")
            .Build();
        _dbContainer.StartAsync().Wait();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<LibraryDbContext>(options =>
            options.UseNpgsql(_dbContainer.GetConnectionString()));

        // Build a provider just for migration
        var sp = services.BuildServiceProvider();
        using var scope = sp.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<LibraryDbContext>();

        // Ensure database + schema exist
        db.Database.EnsureCreated();
    }
}