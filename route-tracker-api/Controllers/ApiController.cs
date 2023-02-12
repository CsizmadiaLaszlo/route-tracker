using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using route_tracker_api.Data;
using route_tracker_api.Services;
using route_tracker_api.Services.Interfaces;

namespace route_tracker_api.Controllers;

[Authorize]
[ApiController]
[Route("api")]
public class ApiController : ControllerBase
{
    private readonly IAccountService _accountService;

    public ApiController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost]
    [Route("new-user")]
    public async Task<ActionResult> AddNewUser()
    {
        var objectId = GetOidForUser();
        try
        {
            await _accountService.AddAccount(objectId);
        }
        catch (Exception e)
        {
            return Conflict(e);
        }

        return Ok();
    }
    
    private string GetOidForUser()
    {
        const string oidType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        return User.Claims.First(claim => (claim.Type).Equals(oidType)).Value;
    }
}