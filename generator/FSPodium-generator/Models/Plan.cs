namespace FSPodium_generator.Models;

public class Plan
{
    public string id { get; set; }
    public string representationId { get; set; }
    public short year { get; set; }
    public Status status { get; set; }

    public Representation Representation { get; set; }
}