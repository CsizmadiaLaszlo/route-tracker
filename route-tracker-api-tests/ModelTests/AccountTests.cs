using route_tracker_api.Models;

namespace route_tracker_api_tests.ModelTests;

[TestFixture]
public class AccountTests
{
    [Test]
    public void Test_Id_IsSetByDatabase()
    {
        // Act
        var account = new Account();
        
        // Assert
        Assert.That(account.Id, Is.EqualTo(0), "Id should be set by the database");
    }
}