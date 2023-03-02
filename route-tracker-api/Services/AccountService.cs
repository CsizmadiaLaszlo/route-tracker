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
        var account = await GetAccountByOid(oid);
        if (account is not null)
        {
            throw new InvalidOperationException($"Unable to add account: account with oid: {oid}, already exist.");
        }

        await _context.Accounts.AddAsync(new Account() { ObjectIdentifier = oid });
        await _context.SaveChangesAsync();
    }

    public async Task<Setting> GetAccountSetting(string oid)
    {
        var account = await GetAccountByOid(oid);
        if (account is null)
            throw new InvalidOperationException("Unable to retrieve account setting: account not found.");
        return account.Setting;
    }

    public async Task<Setting> UpdateAccountSetting(string oid, Setting newSetting)
    {
        var account = await GetAccountByOid(oid);
        if (account is null)
            throw new InvalidOperationException("Unable to update account setting: account not found.");
        account.Setting.UpdateSetting(newSetting);
        await _context.SaveChangesAsync();
        return account.Setting;
    }

    public async Task<Route> AddRoute(string oid, Route route)
    {
        var account = await GetAccountByOid(oid);
        if (account is null) throw new InvalidOperationException("Unable to add route: account not found.");
        route.Waypoints = route.Waypoints
            .Select(waypoint => _context.Waypoints.FirstOrDefault(w => w.Name == waypoint.Name) ?? waypoint)
            .ToList();
        account.Routes.Add(route);
        await _context.SaveChangesAsync();
        return route;
    }

    private async Task<Account> GetAccountByOid(string oid)
    {
        return (await _context.Accounts
            .Include(account => account.Setting)
            .Include(account => account.Routes)
            .FirstOrDefaultAsync(account => account.ObjectIdentifier == oid))!;
    }
}