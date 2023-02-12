using route_tracker_api.Data;
using route_tracker_api.Services.Interfaces;

namespace route_tracker_api.Services;

/// <summary>
/// A class dedicated for account related processes.
/// </summary>

public class AccountService : IAccountService
{
    private readonly RouteTrackerApiContext _context;

    public AccountService(RouteTrackerApiContext context)
    {
        _context = context;
    }
}