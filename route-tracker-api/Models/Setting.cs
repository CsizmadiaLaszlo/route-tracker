using System.ComponentModel.DataAnnotations.Schema;

namespace route_tracker_api.Models;

public class Setting
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public double HourlyRate { get; set; }

    public double OvertimeRate { get; set; }

    public double NightShiftRate { get; set; }

    public void UpdateSetting(Setting newSetting)
    {
        HourlyRate = newSetting.HourlyRate;
        OvertimeRate = newSetting.OvertimeRate;
        NightShiftRate = newSetting.NightShiftRate;
    }
}