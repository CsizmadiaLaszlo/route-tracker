using Microsoft.EntityFrameworkCore;
using route_tracker_api.Models;
using Route = route_tracker_api.Models.Route;

namespace route_tracker_api.Data;

public class RouteTrackerApiContext : DbContext
{
    public DbSet<Account> Accounts { get; init; } = null!;
    public DbSet<Setting> Settings { get; init; } = null!;
    public DbSet<Route> Routes { get; init; } = null!;
    public DbSet<Waypoint> Waypoints { get; init; } = null!;
    public DbSet<Plate> Plates { get; init; } = null!;

    public RouteTrackerApiContext(DbContextOptions<RouteTrackerApiContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}