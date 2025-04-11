
namespace FSPodium_Parser.BL.Models;

public class Team
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Member> Members { get; set; } = [];
    public Region Region { get; set; }
    public int Top { get; set; }
}