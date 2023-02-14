using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using route_tracker_api.Services.Interfaces;

namespace route_tracker_api.Controllers;

[Authorize]
[ApiController]
[Route("api")]
public class ApiController : ControllerBase
{
    private readonly IAccountService _accountService;

    private string Oid
    {
        get
        {
            const string oidType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
            return User.Claims.First(claim => (claim.Type).Equals(oidType)).Value;
        }
    }

    public ApiController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    /// <summary>
    /// Add new user to the database.
    /// The primary key is the Object identifier (ID) of the user object in Azure AD.
    /// </summary>
    [HttpPost]
    [Route("new-user")]
    public async Task<ActionResult> AddNewUser()
    {
        var objectId = GetOidForUser();
        try
        {
            await _accountService.AddAccount(objectId);
        }
        catch (InvalidOperationException e)
        {
            return Conflict($"{e.Message}");
        }

        return Ok();
    }

    /// <summary>
    /// Get the Object identifier from the current user claims.
    /// </summary>
    /// <returns></returns>
    private string GetOidForUser()
    {
        const string oidType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        return User.Claims.First(claim => (claim.Type).Equals(oidType)).Value;
    }
}