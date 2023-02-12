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
        if (_context.Accounts.FirstOrDefault(account => account.Id.Equals(oid)) != null)
        {
            throw new Exception($"There is already an account with this OID: {oid}");
        }
        await _context.Accounts.AddAsync(new Account(oid));
        await _context.SaveChangesAsync();
    }
}