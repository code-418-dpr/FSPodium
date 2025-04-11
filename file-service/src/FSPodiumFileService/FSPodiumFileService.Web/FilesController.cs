using FSPodiumFileService.Web.Application.Providers;
using FSPodiumFileService.Web.Dtos;
using Microsoft.AspNetCore.Mvc;
using FileData = FSPodiumFileService.Web.Dtos.FileData;
using FileInfo = FSPodiumFileService.Web.Dtos.FileInfo;

namespace FSPodiumFileService.Web;

[ApiController]
[Route("api/[controller]")]
public class FilesController: ControllerBase
{
    
    [HttpPost]
    public async Task<IActionResult> UploadFile(
        IFormFile file, 
        string bucketName,
        [FromServices] IFileProvider fileProvider,
        CancellationToken cancellationToken = default)
    {
        var stream = file.OpenReadStream();

        var path = Guid.NewGuid();

        var extension = Path.GetExtension(file.FileName);
        
        var fileData = new FileData(stream, new FileInfo(path.ToString() + extension, bucketName));
        var result = await fileProvider.UploadFiles([fileData], cancellationToken);

        return Ok(result);
    }
    
    [HttpGet]
    public async Task<IActionResult> DownloadFile(
        string bucketName,
        string fileName,
        [FromServices] IFileProvider fileProvider,
        CancellationToken cancellationToken = default)
    {
        
        var fileMetadata = new FileMetadata(bucketName, fileName);
        var result = await fileProvider.GetFileByObjectName(fileMetadata, cancellationToken);

        return Ok(result);
    }

}