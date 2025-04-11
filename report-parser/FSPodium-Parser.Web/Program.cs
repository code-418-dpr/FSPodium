using FSPodium_Parser.Web.Api.Extensions;
using FSPodium_Parser.Web.Api.Middlewares;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogger(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddSerilog();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseExceptionMiddleware();

app.UseSerilogRequestLogging();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(c => 
    c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.MapControllers();

app.Run();