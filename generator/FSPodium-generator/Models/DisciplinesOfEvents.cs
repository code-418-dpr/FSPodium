namespace FSPodium_generator.Models;

public class DisciplinesOfEvents
{
    public string id { get; set; }
    public string disciplineId { get; set; }
    public string eventId { get; set; }

    public Discipline Discipline { get; set; }
    public Event Event { get; set; }
}