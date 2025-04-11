namespace FSPodium_generator.Models;

public class Event
{
    public string id { get; set; }
    public string? representationId { get; set; }
    public string level { get; set; }
    public string title { get; set; }
    public string ageRange { get; set; }
    public DateTime start { get; set; }
    public DateTime end { get; set; }
    public bool isOnline { get; set; }
    public string? sportObjectsId { get; set; }
    public short participantsCount { get; set; }
    public string status { get; set; }
    public string? refusalReason { get; set; }

    public Representation? Representation { get; set; }
    public ICollection<DisciplinesOfEvents> DisciplinesOfEvents { get; set; }
    public SportObject? SportObject { get; set; }
    public ICollection<TeamsOfEvents> TeamsOfEvents { get; set; }
    public ICollection<ResultEvents> ResultEvents { get; set; }
}

public enum Status
{
    DRAFT,
    PENDING,
    APPROVED,
    COMPLETED,
    REFUSED
}


public enum EventLevel {
    REGION,
    FEDREAL_DISTRICT,
    ALL_RUSSIA
}



