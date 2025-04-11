using FSPodiumFileService.Web.Application.Providers;
using FSPodiumFileService.Web.Data.Options;
using FSPodiumFileService.Web.Infrastructure.Providers;
using Minio;

namespace FSPodiumFileService.Web;

public static class DependencyInjection
{
    public static IServiceCollection AddFileServiceInfrastructure(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMinio(configuration);
        
        return services;
    }
    
    
    private static IServiceCollection AddMinio(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MinioOptions>(configuration.GetSection(MinioOptions.MINIO));
        
        services.AddMinio(options =>
        {
            var minioOptions = configuration.GetSection(MinioOptions.MINIO)
                .Get<MinioOptions>() ?? throw new ApplicationException("Missing minio configuration");
                
            
            options.WithEndpoint(minioOptions.Endpoint);

            options.WithCredentials(minioOptions.AccessKey, minioOptions.SecretKey);

            options.WithSSL(minioOptions.WithSsl);

        });

        services.AddScoped<IFileProvider, MinioProvider>();

        return services;
    }
}