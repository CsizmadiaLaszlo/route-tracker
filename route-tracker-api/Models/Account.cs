using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace route_tracker_api.Models;

/// <summary>
/// Represents the user data that is stored on the backend.
/// </summary>

public class Account
{
    
    /// <summary>
    /// Id is the Object identifier (ID) of the user object in Azure AD
    /// </summary>
    [Key]
    public string Id { get; set; }

    public Account(string objectIdentifier)
    {
        Id = objectIdentifier;
    }
}