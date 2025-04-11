namespace FSPodium_generator.Models;

public class Team
{
    public string id { get; set; }
    public string representationId { get; set; }
    public string name { get; set; }
    public string? trainer { get; set; }
    public string? representative { get; set; }

    public Representation Representation { get; set; }
    public ICollection<TeamsOfEvents> TeamsOfEvents { get; set; }
    public ICollection<SportsmansOfTeams> SportsmansOfTeams { get; set; }
}