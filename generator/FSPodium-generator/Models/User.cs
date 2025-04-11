namespace FSPodium_generator.Models;

public class User
{
    public string id { get; set; }
    public string? name { get; set; }
    public string? email { get; set; }
    public DateTime? emailVerified { get; set; }
    public string? password { get; set; }
    public string role { get; set; }
    
    public ICollection<Representation> Representation { get; set; }
}

public enum UserRole {
    CENTRAL_REP,
    REGIONAL_REP
}
