using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

// ReSharper disable CollectionNeverUpdated.Global

namespace route_tracker_api.Models;

public class Plate
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public string Name { get; init; } = null!;
    
    [JsonIgnore]
    public HashSet<Route> Routes { get; set; } = new();
}