
using FSPodium_generator.Infrastructure;
using FSPodium_generator.Models;
using FSPodium_generator.Utils;

ApplicationDbContext db = new ApplicationDbContext();

var user = db.User.ToList();

var rootPath = Environment.CurrentDirectory
    .Split("\\")
    .SkipLast(3);

rootPath = rootPath.Append("Resources").Append("EventsName.txt");

var pathToEventNames = string.Join("/", rootPath);

var representationIds = db.Representation.Select(r => r.id).ToList();

var eventNames = Parser.Parse(pathToEventNames);

List<string> ageRange = ["16+", "18+", "14-17", "21+", "18-21"];
bool[] isOnline = [true, false];
Status[] statuses = [Status.PENDING, Status.APPROVED, Status.COMPLETED, Status.REFUSED];
EventLevel[] levels = [EventLevel.REGION, EventLevel.ALL_RUSSIA, EventLevel.FEDREAL_DISTRICT];

Random rnd = new Random();

for (int i = 0; i < 60;i++)
{
    var startTemp = Parser.GenerateRandomDate(DateTime.UtcNow, DateTime.UtcNow.AddDays(rnd.Next(2,8)));
    db.Events.Add(new Event
    {
        id = Guid.NewGuid().ToString(),
        representationId = representationIds[rnd.Next(0, representationIds.Count - 1)],
        title = eventNames[rnd.Next(0, eventNames.Count - 1)],
        ageRange = ageRange[rnd.Next(0, ageRange.Count - 1)],
        start = startTemp,
        end = Parser.GenerateRandomDate(startTemp.AddDays(2), startTemp.AddDays(rnd.Next(4,8))),
        isOnline = isOnline[rnd.Next(0,2)],
        participantsCount = short.Parse(rnd.Next(10,400).ToString()),
        status = statuses[rnd.Next(0, statuses.Length - 1)].ToString(),
        level = levels[rnd.Next(0, levels.Length - 1)].ToString()
    });
}
db.SaveChanges();