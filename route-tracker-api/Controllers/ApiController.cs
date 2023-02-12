using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace route_tracker_api.Controllers;

[Authorize]
[ApiController]
[Route("api")]
public class ApiController : ControllerBase
{
}