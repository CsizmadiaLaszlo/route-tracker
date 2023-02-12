﻿using Microsoft.EntityFrameworkCore;
using route_tracker_api.Models;

namespace route_tracker_api.Data;

public class RouteTrackerApiContext : DbContext
{
    public DbSet<Account> Accounts { get; set; } = null!;

    public RouteTrackerApiContext(DbContextOptions<RouteTrackerApiContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}