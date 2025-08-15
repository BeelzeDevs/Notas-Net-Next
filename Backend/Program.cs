
using Microsoft.Extensions.Options;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using Backend.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BackendDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddScoped<HealthService>();
builder.Services.AddScoped<INoteService, NoteService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<INoteCategoryService, NoteCategoryService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCorsPolicy", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") // Puerto fijo del front-end
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar CORS
app.UseCors("DevCorsPolicy");

app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/healthDb", async (HealthService healthService) =>
{
    bool canConnect = await healthService.CanConnectAsync();
    return canConnect
        ? Results.Ok(new { status = "ok", message = "Successful connection" })
        : Results.StatusCode(500);
});

app.Run();

