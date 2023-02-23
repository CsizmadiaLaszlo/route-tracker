using Microsoft.EntityFrameworkCore;
using route_tracker_api.Data;
using route_tracker_api.Models;

namespace route_tracker_api_tests.DataTests;

[TestFixture]
public class DbInitializerTests
{
    private RouteTrackerApiContext _context = null!;

    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<RouteTrackerApiContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;
        _context = new RouteTrackerApiContext(options);
    }


    [Test]
    public void TestDbInitialization()
    {
        // Act
        DbInitializer.Initialize(_context);

        // Assert
        Assert.That(_context.Database.EnsureCreated(), Is.False);
    }

    [Test]
    public void TestNoActionWhenTablesExist()
    {
        // Arrange
        _context.Accounts.Add(new Account() { ObjectIdentifier = "test-oid" });
        _context.SaveChanges();

        // Act
        DbInitializer.Initialize(_context);

        // Assert
        Assert.That(_context.Accounts.Count(), Is.EqualTo(1));
    }

    [Test]
    public void TestAccountsExist()
    {
        // Arrange + Act
        var accounts = _context.Accounts;

        // Assert
        Assert.That(accounts, Is.Not.Null);
    }
    
    [Test]
    public void TestSettingsExist()
    {
        // Arrange + Act
        var settings = _context.Settings;

        // Assert
        Assert.That(settings, Is.Not.Null);
    }
}