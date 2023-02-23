using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using route_tracker_api.Controllers;
using route_tracker_api.Models;
using route_tracker_api.Services;
using route_tracker_api.Services.Interfaces;

namespace route_tracker_api_tests.ControllerTests
{
    public class ApiControllerTests
    {
        private ApiController _controller = null!;
        private Mock<IAccountService> _accountServiceMock = null!;
        private Mock<ClaimsPrincipal> _claimsPrincipalMock = null!;

        [SetUp]
        public void Setup()
        {
            _accountServiceMock = new Mock<IAccountService>();
            _claimsPrincipalMock = new Mock<ClaimsPrincipal>();

            var claims = new List<Claim>
            {
                new("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", "12345")
            };
            _claimsPrincipalMock.Setup(x => x.Claims).Returns(claims);

            var httpContext = new DefaultHttpContext
            {
                User = _claimsPrincipalMock.Object
            };

            _controller = new ApiController(_accountServiceMock.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext
                }
            };
        }

        [Test]
        public async Task AddNewUser_ShouldReturnOk_WhenAccountIsAdded()
        {
            // Arrange
            _accountServiceMock.Setup(x => x.AddAccount(It.IsAny<string>()))
                .Returns(Task.FromResult(0));

            // Act
            var result = await _controller.AddNewUser();

            // Assert
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task AddNewUser_ShouldReturnConflict_WhenAddingAccountFails()
        {
            // Assert
            _accountServiceMock.Setup(x => x.AddAccount(It.IsAny<string>()))
                .Throws(new InvalidOperationException("Error"));

            // Act
            var result = await _controller.AddNewUser();
            var conflictResult = result as ConflictObjectResult;

            // Assert
            Assert.That(conflictResult, Is.Not.Null, "Expected ConflictObjectResult");
        }

        [Test]
        public async Task GetAccountSetting_ReturnsOk_WhenSettingExists()
        {
            // Arrange
            var expectedSetting = new Setting();
            var account = new Account { Setting = expectedSetting };
            _accountServiceMock.Setup(x => x.GetAccountSetting(It.IsAny<string>())).ReturnsAsync(account.Setting);

            // Act
            var result = await _controller.GetAccountSetting();

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult!.Value, Is.EqualTo(expectedSetting));
        }

        [Test]
        public async Task GetAccountSetting_ThrowsInvalidOperationException_WhenAccountDoesNotExist()
        {
            // Arrange
            _accountServiceMock.Setup(x => x.GetAccountSetting(It.IsAny<string>()))
                .Throws<InvalidOperationException>();

            // Act
            var result = await _controller.GetAccountSetting();

            // Assert
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            var badRequestResult = result as BadRequestObjectResult;
            Assert.That(badRequestResult!.Value, Is.EqualTo("Unable to retrieve account setting: account not found."));
        }

        [Test]
        public async Task UpdateAccountSetting_ValidSetting_ReturnsUpdatedSetting()
        {
            // Arrange
            var expectedSetting = new Setting();
            // var account = new Account { Setting = expectedSetting };
            _accountServiceMock.Setup(x => x.UpdateAccountSetting(It.IsAny<string>(), expectedSetting))
                .ReturnsAsync(expectedSetting);

            // Act
            var result = await _controller.UpdateAccountSetting(expectedSetting);

            // Assert
            Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.That(createdAtActionResult!.Value, Is.EqualTo(expectedSetting));
        }
        
    }
}