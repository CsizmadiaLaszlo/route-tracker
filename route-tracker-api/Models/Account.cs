using System.ComponentModel.DataAnnotations.Schema;

namespace route_tracker_api.Models;

/// <summary>
/// Represents the user data that is stored on the backend.
/// </summary>

public class Account
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    private int Id { get; set; }
    
    /// <summary>
    /// ObjectIdentifier is the Object identifier (ID) of the user object in Azure AD
    /// </summary>
    public string ObjectIdentifier { get; set; }

    public Account(string objectIdentifier)
    {
        ObjectIdentifier = objectIdentifier;
    }
}