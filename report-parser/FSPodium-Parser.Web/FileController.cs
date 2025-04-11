using FSPodium_Parser.BL;
using Microsoft.AspNetCore.Mvc;

namespace FSPodium_Parser.Web;

[ApiController]
[Route("api/[controller]")]
public class FileController: ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationToken = default)
    {
        await using var stream = file.OpenReadStream();
        if (stream.Length <= 0)
            return BadRequest("content length is 0 or less");

        var result = Parser.ParseTeamFromDoc(stream);

        return Ok(result);
    }
}