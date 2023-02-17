﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace route_tracker_api.Models;

/// <summary>
/// Represents the user data that is stored on the backend.
/// </summary>
public class Account
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    /// <summary>
    /// Object identifier (ID) of the user object in Azure AD
    /// </summary>
    [Required]
    public string ObjectIdentifier { get; init; } = null!;
    
    [Required]
    public Setting Setting { get; set; } = null!;
}