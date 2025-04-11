namespace FSPodium_generator.Models;

public class Representation
{
    public string id { get; set; }
    public string regionId { get; set; }
    public string userId { get; set; }
    public DateTime createdAt { get; set; }

    public Region Region { get; set; }
    public ICollection<Event> Events { get; set; }
    public ICollection<Plan> Plans { get; set; }
    public User User { get; set; }
    public ICollection<Team> Teams { get; set; }
    public ICollection<ResultEvents> ResultEvents { get; set; }
}