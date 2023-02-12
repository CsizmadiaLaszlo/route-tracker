using System.ComponentModel.DataAnnotations.Schema;

namespace route_tracker_api.Models;

public class Account
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    private int Id { get; set; }
    public string ObjectIdentifier { get; set; }

    public Account(string objectIdentifier)
    {
        ObjectIdentifier = objectIdentifier;
    }
}