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
    /// Adds a new account with the specified object identifier (OID) to the database.
    /// </summary>
    /// <param name="oid">The OID of the account to add.</param>
    /// <remarks>
    /// This method adds a new account with the specified OID to the database. If an account with the same OID already exists, an InvalidOperationException will be thrown.
    /// </remarks>
    /// <exception cref="InvalidOperationException">Thrown when an account with the specified OID already exists in the database.</exception>
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

    /// <summary>
    /// Retrieves the account setting for the specified account.
    /// </summary>
    /// <param name="oid">The object identifier of the account to retrieve the setting for.</param>
    /// <returns>A Setting object representing the account setting.</returns>
    /// <exception cref="InvalidOperationException">Thrown when the account cannot be found.</exception>
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

    /// <summary>
    /// Updates the setting for the account identified by the specified Object Identifier (OID).
    /// </summary>
    /// <param name="oid">The OID of the account to update.</param>
    /// <param name="newSetting">The new setting to apply to the account.</param>
    /// <returns>The updated setting for the account.</returns>
    /// <exception cref="InvalidOperationException">Thrown when an account with the specified OID is not found.</exception>
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

    /// <summary>
    /// Adds a new route to the account with the specified object identifier.
    /// </summary>
    /// <param name="oid">The object identifier of the account.</param>
    /// <param name="route">The route to add to the account.</param>
    /// <returns>The added route.</returns>
    /// <exception cref="InvalidOperationException">Thrown when the account with the specified object identifier cannot be found.</exception>
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

    /// <summary>
    /// Gets a list of all waypoints.
    /// </summary>
    /// <returns>A list of waypoints.</returns>
    /// <exception cref="InvalidOperationException">Thrown when waypoints are not found in the database.</exception>
    public async Task<List<Waypoint>> GetWaypoints()
    {
        var waypoints = await _context.Waypoints.AsNoTracking().ToListAsync();
        if (waypoints is null) throw new InvalidOperationException("Unable to get waypoints: waypoints not found.");
        return waypoints;
    }

    /// <summary>
    /// Retrieves a list of all the available plates from the database.
    /// </summary>
    /// <returns>A list of plates.</returns>
    /// <exception cref="InvalidOperationException">Thrown when plates are not found in the database.</exception>
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