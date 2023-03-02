using System.ComponentModel.DataAnnotations.Schema;

// ReSharper disable PropertyCanBeMadeInitOnly.Global

namespace route_tracker_api.Models;

/// <summary>
/// Represents the user data that is stored on the backend.
/// </summary>
public class Account
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    /// <summary>
    /// Object identifier (ID) of the user object in Azure AD
    /// </summary>
    public string ObjectIdentifier { get; init; } = null!;

    [Required] 
    public Setting Setting { get; set; } = null!;
}