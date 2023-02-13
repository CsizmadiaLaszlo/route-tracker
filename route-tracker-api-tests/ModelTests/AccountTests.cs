using NUnit.Framework;
using route_tracker_api.Models;

namespace route_tracker_api_tests;

[TestFixture]
public class AccountTests
{
    [Test]
    public void Test_Id_IsSetByDatabase()
    {
        var account = new Account();
        Assert.That(account.Id, Is.EqualTo(0), "Id should be set by the database");
    }
}