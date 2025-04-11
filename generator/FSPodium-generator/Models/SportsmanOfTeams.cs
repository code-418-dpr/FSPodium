namespace FSPodium_generator.Models;

public class SportsmansOfTeams
{
  public string id { get; set; }
  public string sportsmanId { get; set; }
  public string teamId { get; set; }

  public Sportsman Sportsman { get; set; }
  public Team Team { get; set; }
}
