
using Microsoft.Extensions.Options;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BackendDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<HealthService>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/healthDb", async (HealthService healthService) =>
{
    bool canConnect = await healthService.CanConnectAsync();
    return canConnect
        ? Results.Ok(new { status = "ok", message = "Connection Successful" })
        : Results.StatusCode(500);
});

app.Run();

