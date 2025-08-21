using MejdisiIm.Repositories.Interfaces;
using MejdisiIm.Repositories;
using MejdisiIm.Mappings;
using MejdisiIm.Services;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<MejdisiImContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MejdisiIM")));



builder.Services.AddScoped<IEnvironmentalReportService, EnvironmentalReportService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IGreenTipService, GreenTipService>();
builder.Services.AddScoped<IRecyclingCenterService, RecyclingCenterService>();
builder.Services.AddScoped<IReportCategoryService, ReportCategoryService>();
builder.Services.AddScoped<IVoteService, VoteService>();




builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEnvironmentalReportRepository, EnvironmentalReportRepository>();
builder.Services.AddScoped<IReportCategoryRepository, ReportCategoryRepository>();
builder.Services.AddScoped<IGreenTipRepository, GreenTipRepository>();
builder.Services.AddScoped<IRecyclingCenterRepository, RecyclingCenterRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IVoteRepository, VoteRepository>();
builder.Services.AddAutoMapper(typeof(MappingProfile));



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .WithOrigins("http://localhost:5173")  // pa slash në fund
            .AllowAnyHeader()
            .AllowAnyMethod());
});




var app = builder.Build();


app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
