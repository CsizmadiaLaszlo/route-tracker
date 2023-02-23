namespace route_tracker_api.Data;

/// <summary>
/// Ensures database creation on startup and populating it with data.
/// </summary>
public static class DbInitializer
{
    public static void Initialize(RouteTrackerApiContext context)
    {
        // Create DB if not exist
        context.Database.EnsureCreated();
        context.SaveChanges();
    }
}