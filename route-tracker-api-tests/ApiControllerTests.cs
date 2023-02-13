using System.Diagnostics;
using System.Reflection;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using route_tracker_api.Controllers;
using route_tracker_api.Services.Interfaces;

namespace route_tracker_api_tests
{
    public class ApiControllerTests
    {
        private ApiController _controller = null!;
        private Mock<IAccountService> _accountServiceMock = null!;
        private Mock<ClaimsPrincipal> _claimsPrincipalMock = null!;

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}