
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using FSPodium_Parser.BL.Models;

namespace FSPodium_Parser.BL;

public static class Parser
{
    public static List<List<string>> ExtractTablesFromDocx(Stream fileData)
    {
        try
        {
            var tableData = new List<List<string>>();

            using WordprocessingDocument wordDoc = WordprocessingDocument.Open(fileData, false);

            var mainPart = wordDoc.MainDocumentPart;
            var tables = mainPart.Document.Body.Elements<Table>();

            foreach (var table in tables)
            {
                var rows = table.Elements<TableRow>();
                foreach (var row in rows)
                {
                    var cells = row.Elements<TableCell>();
                    var rowData = new List<string>();

                    foreach (var cell in cells)
                    {
                        var cellText = string.Concat(cell.Descendants<Text>().Select(t => t.Text));
                        rowData.Add(cellText);
                    }

                    tableData.Add(rowData);
                }
            }

            return tableData;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return null;
        }
    }

    public static List<Team> ParseTeamFromDoc(Stream fileData)
    {
        var data = ExtractTablesFromDocx(fileData).Where(d => d.Count == 4);
        List<Team> result = [];

        foreach ((int index,var item) in data.Index())
        {
            if(item.FirstOrDefault(w => w.Replace(" ","").Equals(String.Empty)) != null)
                continue;
            
            if(item.FirstOrDefault(w => w.Trim().Equals("Место")) != null)
            {
                result = ParseTeamPart(data.Skip(index + 1).ToList());
                break;
            }
        }

        return result;
    }

    private static List<Team> ParseTeamPart(List<List<string>> data)
    {
        List<Team> teams = [];
        
        foreach ((int index,var item) in data.Index())
        {
            if(item.FirstOrDefault(w => w.Replace(" ","").Equals(String.Empty)) != null)
                break;
            
            var row = data[index];
            var names = ParseNames(row[1]);
            var members = new List<Member>();
            
            foreach (var name in names)
            {
                members.Add(new Member { Id = Guid.NewGuid(), FullName = name });
            }

            var teamName = row[1]
                .Replace("("," ")
                .Split(" ").Last().TrimEnd(')');

            teams.Add(new Team
            {
                Id = Guid.NewGuid(),
                Top = int.Parse(row[0]),
                Members = members,
                Name = teamName,
                Region = new Region
                {
                    Id = Guid.NewGuid(),
                    Name = row[3]
                }
            });

        }
        
        return teams;
    }
    
    private static List<string> ParseNames(string input)
    {
        List<string> names = new List<string>();
        string pattern = @"([А-ЯЁ][а-яё]+)\s+([А-ЯЁ][а-яё]+)\s+([А-ЯЁ][а-яё]+)";
        MatchCollection matches = Regex.Matches(input, pattern);

        foreach (Match match in matches)
        {
            string lastName = match.Groups[1].Value;
            string firstName = match.Groups[2].Value;
            string patronymic = match.Groups[3].Value;
            names.Add($"{lastName} {firstName} {patronymic}");
        }

        return names;
    }

}