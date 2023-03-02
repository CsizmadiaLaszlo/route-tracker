using Microsoft.EntityFrameworkCore;
using route_tracker_api.Data;
using route_tracker_api.Models;
using route_tracker_api.Services.Interfaces;
using Route = route_tracker_api.Models.Route;

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

    /// <summary>
    /// Creates an account for the current user. Sets the account ObjectIdentifier and adds it to the database.
    /// </summary>
    /// <param name="oid">Object identifier (ID) of the user object in Azure AD</param>
    /// <exception cref="InvalidOperationException">If an account with the OID already exists, an InvalidOperationException is thrown.</exception>
    public async Task AddAccount(string oid)
    {
        var account = await _context.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.ObjectIdentifier == oid);
        if (account is not null)
        {
            throw new InvalidOperationException($"Unable to add account: account with oid: {oid}, already exist.");
        }

        await _context.Accounts.AddAsync(new Account() { ObjectIdentifier = oid });
        await _context.SaveChangesAsync();
    }

    public async Task<Setting> GetAccountSetting(string oid)
    {
        var account = await _context.Accounts
            .Include(account => account.Setting)
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.ObjectIdentifier == oid);
        if (account is null)
            throw new InvalidOperationException("Unable to retrieve account setting: account not found.");
        return account.Setting;
    }

    public async Task<Setting> UpdateAccountSetting(string oid, Setting newSetting)
    {
        var account = await _context.Accounts
            .Include(account => account.Setting)
            .FirstOrDefaultAsync(account => account.ObjectIdentifier == oid);
        if (account is null)
            throw new InvalidOperationException("Unable to update account setting: account not found.");
        account.Setting.UpdateSetting(newSetting);
        await _context.SaveChangesAsync();
        return account.Setting;
    }

    public async Task<Route> AddRoute(string oid, Route route)
    {
        var account = await _context.Accounts
            .Include(account => account.Routes)
            .FirstOrDefaultAsync(account => account.ObjectIdentifier == oid);
        if (account is null) throw new InvalidOperationException("Unable to add route: account not found.");
        route.Waypoints = route.Waypoints
            .Select(waypoint => _context.Waypoints.FirstOrDefault(w => w.Name == waypoint.Name) ?? waypoint)
            .ToList();
        route.Plates = route.Plates
            .Select(plate => _context.Plates.FirstOrDefault(p => p.Name == plate.Name) ?? plate)
            .ToHashSet();
        account.Routes.Add(route);
        await _context.SaveChangesAsync();
        return route;
    }

    public async Task<List<Waypoint>> GetWaypoints()
    {
        var waypoints = await _context.Waypoints.AsNoTracking().ToListAsync();
        if (waypoints is null) throw new InvalidOperationException("Unable to get waypoints: waypoints not found.");
        return waypoints;
    }

    public async Task<List<Plate>> GetPlates()
    {
        var plates = await _context.Plates.AsNoTracking().ToListAsync();
        if (plates is null) throw new InvalidOperationException("Unable to get plates: plates not found.");
        return plates;
    }

    public async Task<HashSet<Route>> GetRoutesByDay(string oid, DateTime date)
    {
        var account = await _context.Accounts
            .Include(account => account.Routes)
            .ThenInclude(route => route.Waypoints)
            .AsSplitQuery()
            .Include(account => account.Routes)
            .ThenInclude(route => route.Plates)
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.ObjectIdentifier == oid);
        if (account is null)
            throw new InvalidOperationException("Unable to get routes: account not found.");
        return account.Routes.Where(route =>
            route.StartDate.Year == date.Year && route.StartDate.DayOfYear == date.DayOfYear).ToHashSet();
    }
}