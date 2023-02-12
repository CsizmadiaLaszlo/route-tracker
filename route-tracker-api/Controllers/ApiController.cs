using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace route_tracker_api.Controllers;

[Authorize]
[ApiController]
[Route("api")]
public class ApiController : ControllerBase
{
    private string GetOidForUser()
    {
        const string oidType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        return User.Claims.First(claim => (claim.Type).Equals(oidType)).Value;
    }
}