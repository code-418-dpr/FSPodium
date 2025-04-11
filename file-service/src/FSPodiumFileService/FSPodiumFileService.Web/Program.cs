using FSPodiumFileService.Web;
using FSPodiumFileService.Web.Api.Extensions;
using FSPodiumFileService.Web.Api.Middlewares;

using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogger(builder.Configuration);

builder.Services.AddHttpLogging(o =>
{
    o.CombineLogs = true;
});

builder.Services.AddSerilog();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddFileServiceInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseExceptionMiddleware();

app.UseSerilogRequestLogging();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
