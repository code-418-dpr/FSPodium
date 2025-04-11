using FSPodiumFileService.Web.Application.Providers;
using FSPodiumFileService.Web.Data.Shared;
using FSPodiumFileService.Web.Dtos;
using Minio;
using Minio.DataModel.Args;

namespace FSPodiumFileService.Web.Infrastructure.Providers;

public class MinioProvider : IFileProvider
{
    private const int MAX_FILE_TIME_ALIVE = 60 * 60 * 24;
    private const int MAX_DEGREE_OF_PARALLELISM = 10;
    private readonly IMinioClient _client;
    private readonly ILogger<MinioProvider> _logger;

    public MinioProvider(IMinioClient client, ILogger<MinioProvider> logger)
    {
        _client = client;
        _logger = logger;
    }
    

    public async Task<Result<IReadOnlyList<string>>> UploadFiles(IEnumerable<Dtos.FileData> filesData, CancellationToken cancellationToken)
    {
        var semaphoreSlim = new SemaphoreSlim(MAX_DEGREE_OF_PARALLELISM);
        var filesList = filesData.ToList();

        try
        {
            await IsBucketExist(filesList.Select(f => f.FileInfo.BucketName), cancellationToken);

            var tasks = filesList.Select(async file =>
                await PutObject(file, semaphoreSlim, cancellationToken));

            var pathsResult = await Task.WhenAll(tasks);

            if (pathsResult.Any(p => p.IsFailure))
                return pathsResult.First().Errors;

            var results = pathsResult.Select(p => p.Value).ToList();

            return results;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Fail to upload files in minio, files amount: {amount}", filesList.Count);

            return Error.Failure("file.upload", "Fail to upload files in minio");
        }
    }

    public async Task<Result<string>> GetFileByObjectName(FileMetadata fileMetadata, CancellationToken cancellationToken)
    {
        try
        {
            var presignedGetObjectArgs = new PresignedGetObjectArgs()
                .WithBucket(fileMetadata.BucketName)
                .WithObject(fileMetadata.ObjectName)
                .WithExpiry(MAX_FILE_TIME_ALIVE);

            return await _client.PresignedGetObjectAsync(presignedGetObjectArgs);
        }
        catch (Exception e)
        {
            _logger.LogError(e,"Fail to get file in minio");
            return Error.Failure("file.get", "Fail to get file in minio");
        }
    }

    private async Task<Result<string>> PutObject(
        FileData fileData,
        SemaphoreSlim semaphoreSlim,
        CancellationToken cancellationToken)
    {
        await semaphoreSlim.WaitAsync(cancellationToken);

        var putObjectArgs = new PutObjectArgs()
            .WithBucket(fileData.FileInfo.BucketName)
            .WithStreamData(fileData.Stream)
            .WithObjectSize(fileData.Stream.Length)
            .WithObject(fileData.FileInfo.FilePath);

        try
        {
            await _client.PutObjectAsync(putObjectArgs, cancellationToken);

            return fileData.FileInfo.FilePath;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Fail to upload file in minio with path {path} in bucket {bucket}",
                fileData.FileInfo.FilePath,
                fileData.FileInfo.BucketName);

            return Error.Failure("file.upload", "Fail to upload file in minio");
        }
        finally
        {
            semaphoreSlim.Release();
        }
    }
    
    public Task<Result<string>> DeleteFile(FileMetadata fileMetadata, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
    

    public async Task<Result> RemoveFile(
        Dtos.FileInfo fileInfo,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await IsBucketExist([fileInfo.BucketName], cancellationToken);

            var statArgs = new StatObjectArgs()
                .WithBucket(fileInfo.BucketName)
                .WithObject(fileInfo.FilePath);
            
            var arg = new RemoveObjectArgs()
                .WithBucket(fileInfo.BucketName)
                .WithObject(fileInfo.FilePath);

            await _client.RemoveObjectAsync(arg, cancellationToken);
        }
        catch(Exception e)
        {
            _logger.LogError(e,"Fail to remove file in minio with path {path} in bucket {bucket}",
                fileInfo.FilePath, fileInfo.BucketName);
            return Error.Failure("file.delete", "Fail to delete file in minio");
        }

        return Result.Success();
    }
    
    private async Task IsBucketExist(IEnumerable<string> bucketNames,CancellationToken cancellationToken)
    {
        HashSet<string> buckets = [..bucketNames];

        foreach (var bucketName in buckets)
        {
            var bucketExistArgs = new BucketExistsArgs()
                .WithBucket(bucketName);

            var bucketExist = await _client.BucketExistsAsync(bucketExistArgs, cancellationToken);

            if (bucketExist == false)
            {
                var makeBucketArgs = new MakeBucketArgs()
                    .WithBucket(bucketName);

                await _client.MakeBucketAsync(makeBucketArgs, cancellationToken);
            }
        }
    }
}