using route_tracker_api.Models;

namespace route_tracker_api.Services.Interfaces;

public interface IAccountService
{
    Task AddAccount(string oid);
    Task<Setting> GetAccountSetting(string oid);
    Task<Setting> UpdateAccountSetting(string oid, Setting newSetting);
}