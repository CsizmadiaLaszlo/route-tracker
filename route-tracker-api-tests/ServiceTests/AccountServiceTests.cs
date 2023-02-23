using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using route_tracker_api.Data;
using route_tracker_api.Models;
using route_tracker_api.Services;

namespace route_tracker_api_tests.ServiceTests
{
    [TestFixture]
    public class AccountServiceTests
    {
        private RouteTrackerApiContext _context = null!;
        private AccountService _accountService = null!;
        private const string Oid = "7bc52719-edc9-4185-80bf";

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<RouteTrackerApiContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new RouteTrackerApiContext(options);
            _accountService = new AccountService(_context);
        }

        [Test]
        public async Task AddAccount_ShouldAddAccount()
        {
            // Act
            await _accountService.AddAccount(Oid);
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.ObjectIdentifier == Oid);

            // Assert
            Assert.That(account, Is.Not.Null);
            Debug.Assert(account != null, nameof(account) + " != null");
            Assert.That(account.ObjectIdentifier, Is.EqualTo(Oid));
        }

        [Test]
        public async Task AddAccount_ShouldThrowException_WhenAccountWithOidAlreadyExists()
        {
            // Arrange
            var account = new Account { ObjectIdentifier = Oid };

            // Act
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            var ex = Assert.ThrowsAsync<InvalidOperationException>(() => _accountService.AddAccount(Oid));
            
            // Assert
            Assert.That(ex, Is.Not.Null);
            Debug.Assert(ex != null, nameof(ex) + " != null");
            Assert.That(ex.Message, Is.EqualTo($"There is already an account with OID: {Oid}"));
        }
    }
}