using api;
using api.Services;
using dataaccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NSwag;
using NSwag.Generation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApiDocument(config =>
{
    config.Title = "Library API";
    config.Version = "v1";

});

builder.Services.AddOptions<AppOptions>()
    .Bind(builder.Configuration.GetSection("AppOptions"))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddDbContext<LibraryDbContext>((sp, options) =>
{
    var appOptions = sp.GetRequiredService<IOptions<AppOptions>>().Value;
    options.UseNpgsql(appOptions.ConnectionString);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddScoped<IGenreService, GenreService>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.GenerateApiClientsFromOpenApi("/../../client/libClient/src/models/generated-client.ts")
    .GetAwaiter()
    .GetResult();

app.UseCors(config => config
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
    .SetIsOriginAllowed(x => true));


app.Run();
