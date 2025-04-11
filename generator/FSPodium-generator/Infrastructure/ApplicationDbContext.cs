using FSPodium_generator.Infrastructure.Configurations;
using FSPodium_generator.Models;
using Microsoft.EntityFrameworkCore;

namespace FSPodium_generator.Infrastructure;

public class ApplicationDbContext: DbContext
{
    private string POSTGRES_USER = Environment.GetEnvironmentVariable("POSTGRES_USER");
    private string POSTGRES_PASSWORD = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
    private string POSTGRES_DB = Environment.GetEnvironmentVariable("POSTGRES_DB");
    private string POSTGRES_HOST = Environment.GetEnvironmentVariable("POSTGRES_HOST");

    private static string _connectionString;
    
    public ApplicationDbContext()
    {
        _connectionString = $"Host={POSTGRES_HOST};Port=5432;Database={POSTGRES_DB};UserId={POSTGRES_USER};Password={POSTGRES_PASSWORD};";;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
         modelBuilder.ApplyConfiguration(new DisciplineConfiguration());
         modelBuilder.ApplyConfiguration(new FederalDistrictConfiguration());
         modelBuilder.ApplyConfiguration(new RegionConfiguration());
         modelBuilder.ApplyConfiguration(new UserConfiguration());
         modelBuilder.ApplyConfiguration(new RepresentationConfiguration());
         modelBuilder.ApplyConfiguration(new RepresentationRequestConfiguration());
    }

    public DbSet<Event> Events { get; set; } = null!;
    public DbSet<User> User { get; set; } = null!;
    public DbSet<Representation> Representation { get; set; } = null!;
    public DbSet<Discipline> Disciplines { get; set; } = null!;
    public DbSet<FederalDistrict> FederalDistricts { get; set; } = null!;
    public DbSet<Region> Regions { get; set; } = null!;
}