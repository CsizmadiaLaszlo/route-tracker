namespace route_tracker_api.Data;

public class DbInitializer
{
    public static void Initialize(RouteTrackerApiContext context)
    {
        // Create DB if not exist
        context.Database.EnsureCreated();
        context.SaveChanges();
    }
}