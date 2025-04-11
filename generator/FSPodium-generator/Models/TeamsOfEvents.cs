namespace FSPodium_generator.Models;

public class TeamsOfEvents
{
    public string id { get; set; }
    public string teamId { get; set; }
    public string eventId { get; set; }
    public short place { get; set; }

    public Team Team { get; set; }
    public Event Event { get; set; }
}