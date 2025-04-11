namespace FSPodium_generator.Models;

public class RepresentationRequest
{
    public string id { get; set; }
    public string regionId { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string status { get; set; }
    public string? refusalReason { get; set; }

    public Region Region { get; set; }
}
