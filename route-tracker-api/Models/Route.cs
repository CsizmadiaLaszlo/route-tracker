using System.ComponentModel.DataAnnotations.Schema;

// ReSharper disable CollectionNeverUpdated.Global

namespace route_tracker_api.Models;

public class Route
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public List<Waypoint> Waypoints { get; set; } = new();
    public HashSet<Plate> Plates { get; set; } = new();
}