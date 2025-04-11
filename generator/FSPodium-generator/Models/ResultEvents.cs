namespace FSPodium_generator.Models;

public class ResultEvents
{
    public string id { get; set; }
    public string eventId { get; set; }
    public string? representationId { get; set; }
    public string fileName { get; set; }
    public byte[] file { get; set; }

    public Event Event { get; set; }
    public Representation? Representation { get; set; }
}