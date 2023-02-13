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

    [Test]
    public void TestNoActionWhenTablesExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<RouteTrackerApiContext>()
            .UseInMemoryDatabase(databaseName: "NoActionWhenTablesExistTestDb")
            .Options;
        var context = new RouteTrackerApiContext(options);
        context.Accounts.Add(new Account(){ObjectIdentifier = "test-oid"});
        context.SaveChanges();

        // Act
        DbInitializer.Initialize(context);

        // Assert
        Assert.That(context.Accounts.Count(), Is.EqualTo(1));
    }
}