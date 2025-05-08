using BlogApi2_backend.Configuration;
using BlogApi2_backend.Data;
using BlogApi2_backend.Exceptions;
using BlogApi2_backend.Repository;
using BlogApi2_backend.Services;
using BlogApi2_backend.Services.IServices;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<BlogContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<IBlogReadService, BlogService>();
builder.Services.AddScoped<IBlogWriteService, BlogService>();
builder.Services.AddScoped<IBlogDeleteService, BlogService>();

builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IAuthorService, AuthorService>();
builder.Services.AddScoped<IAuthorWriteService, AuthorService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")                                                                                             // Replace with your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDistributedMemoryCache();                                                                                                // Adds a memory cache to store session data
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);                                                                                   // Set timeout duration for the session
    options.Cookie.HttpOnly = true;                                                                                                     // Restrict cookie access to HTTP only
    options.Cookie.IsEssential = true;                                                                                         // Make sure the cookie is essential for the app
});

IServiceCollection serviceCollection = builder.Services.AddAutoMapper(typeof(AutoMapperConfig));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<GlobalExceptionMiddleware>();

// Apply CORS middleware
app.UseCors("AllowSpecificOrigin");
app.UseSession();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
