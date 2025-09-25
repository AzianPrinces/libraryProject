using api;
using dataaccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

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


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


app.Run();
