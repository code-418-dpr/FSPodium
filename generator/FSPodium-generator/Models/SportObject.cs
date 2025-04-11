namespace FSPodium_generator.Models;

public class SportObject
{
    public string id { get; set; }
    public string name { get; set; }
    public string address { get; set; }

    public ICollection<Event> Events { get; set; }
}