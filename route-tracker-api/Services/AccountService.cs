using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task AddAccount(string oid)
    {
        if ((await _context.Accounts.FirstOrDefaultAsync(account => account.ObjectIdentifier == oid)) is not null)
        {
            throw new InvalidOperationException($"There is already an account with OID: {oid}");
        }

        await _context.Accounts.AddAsync(new Account() { ObjectIdentifier = oid });
        await _context.SaveChangesAsync();
    }
}