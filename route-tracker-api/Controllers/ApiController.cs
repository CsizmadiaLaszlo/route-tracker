using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using route_tracker_api.Models;
using route_tracker_api.Services.Interfaces;
using Route = route_tracker_api.Models.Route;

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
        try
        {
            await _accountService.AddAccount(Oid);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(exception);
        }

        return Ok();
    }

    [HttpGet]
    [Route("setting")]
    public async Task<ActionResult> GetAccountSetting()
    {
        try
        {
            var setting = await _accountService.GetAccountSetting(Oid);
            return Ok(setting);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception);
        }
    }

    [HttpPut]
    [Route("setting")]
    public async Task<ActionResult> UpdateAccountSetting([FromBody] Setting setting)
    {
        try
        {
            var newSetting = await _accountService.UpdateAccountSetting(Oid, setting);
            return CreatedAtAction("UpdateAccountSetting", newSetting);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception);
        }
    }

    [HttpPost]
    [Route("route")]
    public async Task<ActionResult> AddNewRoute([FromBody] Route route)
    {
        try
        {
            var newRoute = await _accountService.AddRoute(Oid, route);
            return CreatedAtAction("AddNewRoute", newRoute);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception);
        }
    }

    [HttpGet]
    [Route("routes")]
    public async Task<ActionResult> GetRoutesByDay([FromQuery(Name = "date")] DateTime date)
    {
        try
        {
            var routes = await _accountService.GetRoutesByDay(Oid, date);
            return Ok(routes);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception);
        }
    }

    [HttpGet]
    [Route("waypoint")]
    public async Task<ActionResult> GetWaypoints()
    {
        try
        {
            var waypoints = await _accountService.GetWaypoints();
            return Ok(waypoints);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception);
        }
    }

    [HttpGet]
    [Route("plate")]
    public async Task<ActionResult> GetPlates()
    {
        try
        {
            var plates = await _accountService.GetPlates();
            return Ok(plates);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception);
        }
    }
}