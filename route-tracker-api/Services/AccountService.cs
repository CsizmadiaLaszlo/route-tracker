using Microsoft.EntityFrameworkCore;
using route_tracker_api.Data;
using route_tracker_api.Models;
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

    /// <summary>
    /// Creates an account for the current user. Sets the account ObjectIdentifier and adds it to the database.
    /// </summary>
    /// <param name="oid">Object identifier (ID) of the user object in Azure AD</param>
    /// <exception cref="InvalidOperationException">If an account with the OID already exists, an InvalidOperationException is thrown.</exception>
    public async Task AddAccount(string oid)
    {
        // TODO use the private async Task<Account> GetAccountByOid(string oid) method
        if ((await _context.Accounts.FirstOrDefaultAsync(account => account.ObjectIdentifier == oid)) is not null)
        {
            throw new InvalidOperationException($"There is already an account with OID: {oid}");
        }

        await _context.Accounts.AddAsync(new Account() { ObjectIdentifier = oid, Setting = new Setting() });
        await _context.SaveChangesAsync();
    }

    public async Task<Setting> GetAccountSetting(string oid)
    {
        var account = await GetAccountByOid(oid);
        if (account is null) throw new InvalidOperationException();
        return account.Setting;
    }

}