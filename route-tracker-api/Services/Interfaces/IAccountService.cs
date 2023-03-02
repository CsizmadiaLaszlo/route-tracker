using route_tracker_api.Models;
using Route = route_tracker_api.Models.Route;

namespace route_tracker_api.Services.Interfaces;

public interface IAccountService
{
    Task AddAccount(string oid);
    Task<Setting> GetAccountSetting(string oid);
    Task<Setting> UpdateAccountSetting(string oid, Setting newSetting);
    Task<Route> AddRoute(string oid, Route route);
    Task<List<Waypoint>> GetWaypoints(string oid);
}