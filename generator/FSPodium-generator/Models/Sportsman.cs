namespace FSPodium_generator.Models;

public class Sportsman
{
    public string id { get; set; }
    public string name { get; set; }
    public DateTime bdate { get; set; }
    public bool isMale { get; set; }

    public ICollection<SportsmansOfTeams> SportsmansOfTeams { get; set; }
}