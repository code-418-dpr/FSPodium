using FSPodiumFileService.Web.Data.Shared;
using FSPodiumFileService.Web.Dtos;
using FileData = FSPodiumFileService.Web.Dtos.FileData;

namespace FSPodiumFileService.Web.Application.Providers;

public interface IFileProvider
{
    Task<Result<IReadOnlyList<string>>> UploadFiles(IEnumerable<FileData> filesData, CancellationToken cancellationToken);
    Task<Result<string>> DeleteFile(FileMetadata fileMetadata, CancellationToken cancellationToken);
    Task<Result<string>> GetFileByObjectName(FileMetadata fileMetadata, CancellationToken cancellationToken);
    Task<Result> RemoveFile(Dtos.FileInfo fileInfo, CancellationToken cancellationToken);
}