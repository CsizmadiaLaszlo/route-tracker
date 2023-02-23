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
            Assert.That(account!.ObjectIdentifier, Is.EqualTo(Oid));
        }

        [Test]
        public async Task AddAccount_ShouldThrowException_WhenAccountWithOidAlreadyExists()
        {
            // Arrange
            var existingAccount = new Account { ObjectIdentifier = Oid, Setting = new Setting() };
            await _context.Accounts.AddAsync(existingAccount);
            await _context.SaveChangesAsync();

            // Act + Assert
            Assert.ThrowsAsync<InvalidOperationException>(() => _accountService.AddAccount(Oid));
        }

        [Test]
        public async Task GetAccountSetting_ValidOid_ReturnsSetting()
        {
            // Arrange
            var setting = new Setting { HourlyRate = 1, OvertimeRate = 1, NightShiftRate = 1 };
            var account = new Account { ObjectIdentifier = Oid, Setting = setting };
            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();

            // Act
            var result = await _accountService.GetAccountSetting(Oid);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.EqualTo(setting));
        }
        
        [Test]
        public void GetAccountSetting_InvalidOid_ThrowsException()
        {
            // Act + Assert
            Assert.ThrowsAsync<InvalidOperationException>(() => _accountService.GetAccountSetting(Oid));
        }
        
        [Test]
        public async Task UpdateAccountSetting_ShouldUpdateAccountSetting()
        {
            // Arrange
            var setting = new Setting { HourlyRate = 1, OvertimeRate = 1, NightShiftRate = 1 };
            var account = new Account { ObjectIdentifier = Oid, Setting = setting };
            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();

            var newSetting = new Setting { HourlyRate = 10, OvertimeRate = 10, NightShiftRate = 10 };
        
            // Act
            var updatedSetting = await _accountService.UpdateAccountSetting(Oid, newSetting);
            
            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(updatedSetting.HourlyRate, Is.EqualTo(newSetting.HourlyRate));
                Assert.That(updatedSetting.OvertimeRate, Is.EqualTo(newSetting.OvertimeRate));
                Assert.That(updatedSetting.NightShiftRate, Is.EqualTo(newSetting.NightShiftRate));
            });
        }
        
    }
}