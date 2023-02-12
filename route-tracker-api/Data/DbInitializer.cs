namespace route_tracker_api.Data;

public static class DbInitializer
{
    public static void Initialize(RouteTrackerApiContext context)
    {
        // Create DB if not exist
        context.Database.EnsureCreated();
        
        // Look for tables, if any, no action
        if (context.Accounts.Any())
        {
            return;
        }
        
        context.SaveChanges();
    }
}