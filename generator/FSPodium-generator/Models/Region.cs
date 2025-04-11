using System.ComponentModel.DataAnnotations.Schema;

namespace FSPodium_generator.Models;

public class Region
{
    public string id { get; set; }
    public string name { get; set; }
    [ForeignKey("FederalDistrict")]
    public string districtId { get; set; }

    public FederalDistrict? FederalDistrict { get; set; }
    public ICollection<Representation> Representation { get; set; } = [];
    public ICollection<RepresentationRequest> RepresentationRequests { get; set; } = [];
}