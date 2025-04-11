namespace FSPodium_generator.Models;

public class FederalDistrict
{
    public string id { get; set; }
    public string name { get; set; }

    public ICollection<Region> Regions { get; set; }
}