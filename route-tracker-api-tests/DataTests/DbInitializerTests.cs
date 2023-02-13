using Microsoft.EntityFrameworkCore;
using route_tracker_api.Data;
using route_tracker_api.Models;

namespace route_tracker_api_tests.DataTests;

[TestFixture]
public class DbInitializerTests
{
    [Test]
    public void TestDbInitialization()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<RouteTrackerApiContext>()
            .UseInMemoryDatabase(databaseName: "TestDbInitialization")
            .Options;

        using var context = new RouteTrackerApiContext(options);
        // Act
        DbInitializer.Initialize(context);

        // Assert
        Assert.That(context.Database.EnsureCreated(), Is.False);
    }

    }
}