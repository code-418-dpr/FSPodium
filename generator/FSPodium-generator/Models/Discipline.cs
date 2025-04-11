namespace FSPodium_generator.Models;

public class Discipline
{
    public string id { get; set; }
    public string name { get; set; }

    public ICollection<DisciplinesOfEvents> DisciplinesOfEvents { get; set; }
}