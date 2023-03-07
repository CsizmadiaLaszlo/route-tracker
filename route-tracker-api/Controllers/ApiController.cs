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
    /// Adds a new user account to the database.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a new user account using the authenticated user's object identifier (Oid).
    /// If the Oid is already associated with an existing account, a 409 Conflict response will be returned.
    /// </remarks>
    /// <returns>
    /// Returns an ActionResult with a status code of 200 OK if the user account was successfully created, or a status
    /// code of 409 Conflict if the Oid is already associated with an existing account.
    /// </returns>
    /// <exception cref="InvalidOperationException">Thrown when an error occurs while adding the new account.</exception>
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

    /// <summary>
    /// Retrieves the account setting for the authenticated user.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves the account settings for the authenticated user using the object identifier (Oid)
    /// associated with the user. If the Oid is not associated with an existing account, a 400 Bad Request response
    /// will be returned.
    /// </remarks>
    /// <returns>
    /// Returns an ActionResult with a status code of 200 OK and the account setting in the response body if successful,
    /// or a status code of 400 Bad Request if the Oid is not associated with an existing account.
    /// </returns>
    /// <exception cref="InvalidOperationException">Thrown when an error occurs while retrieving the account setting.</exception>
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

    /// <summary>
    /// Updates the account setting for the authenticated user.
    /// </summary>
    /// <remarks>
    /// This endpoint updates the account setting for the authenticated user using the object identifier (Oid)
    /// associated with the user and the new setting provided in the request body. If the Oid is not associated with an
    /// existing account, a 400 Bad Request response will be returned.
    /// </remarks>
    /// <param name="setting">The new account setting.</param>
    /// <returns>
    /// Returns an ActionResult with a status code of 201 Created and the updated account setting in the response body
    /// if successful, or a status code of 400 Bad Request if the Oid is not associated with an existing account.
    /// </returns>
    /// <exception cref="InvalidOperationException">Thrown when an error occurs while updating the account setting.</exception>
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

    /// <summary>
    /// Adds a new route for the authenticated user.
    /// </summary>
    /// <remarks>
    /// This endpoint adds a new route for the authenticated user using the object identifier (Oid) associated with the
    /// user and the new route provided in the request body. If the Oid is not associated with an existing account,
    /// a 400 Bad Request response will be returned.
    /// </remarks>
    /// <param name="route">The new route to be added.</param>
    /// <returns>
    /// Returns an ActionResult with a status code of 201 Created and the newly created route in the response body
    /// if successful, or a status code of 400 Bad Request if the Oid is not associated with an existing account.
    /// </returns>
    /// <exception cref="InvalidOperationException">Thrown when an error occurs while adding the new route.</exception>
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

    /// <summary>
    /// Retrieves all routes for the authenticated user on a specified day.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves all routes for the authenticated user on a specified day using the object
    /// identifier (Oid) associated with the user and the date provided as a query parameter. If the Oid is not
    /// associated with an existing account, a 400 Bad Request response will be returned.
    /// </remarks>
    /// <param name="date">The date on which to retrieve all routes for the authenticated user.</param>
    /// <returns>
    /// Returns an ActionResult with a status code of 200 OK and the list of routes in the response body if successful,
    /// or a status code of 400 Bad Request if the Oid is not associated with an existing account.
    /// </returns>
    /// <exception cref="InvalidOperationException">Thrown when an error occurs while retrieving the routes.</exception>
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

    /// <summary>
    /// Retrieves all waypoints.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves all waypoints. If an error occurs while retrieving the waypoints,
    /// a 400 Bad Request response will be returned.
    /// </remarks>
    /// <returns>
    /// Returns an ActionResult with a status code of 200 OK and the list of waypoints in the response body if
    /// successful, or a status code of 400 Bad Request if an error occurs while retrieving the waypoints.
    /// </returns>
    /// <exception cref="InvalidOperationException">Thrown when an error occurs while retrieving the waypoints.</exception>
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