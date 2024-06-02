using Serilog;
using backend.Authentication;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using backend.Interfaces;
using backend.Repositories;
using Microsoft.OpenApi.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var logger = new LoggerConfiguration().WriteTo.MongoDBBson(
    builder.Configuration.GetConnectionString("DefaultConnectionLog") ?? "",
    restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning
       ).CreateLogger();

builder.Logging.AddSerilog(logger);

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme.",
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}
                    }
                });
});

builder.Services.AddCors((options) =>
{
    options.AddPolicy("DevCors", (corsBuilder) =>
    {
        corsBuilder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
    options.AddPolicy("ProdCors", (corsBuilder) =>
    {
        corsBuilder.WithOrigins("https://minharefeicao.com/")
            .WithMethods("POST", "PUT", "DELETE", "GET")
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// ????? Safe ??????
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", builder.Configuration.GetSection("AppSettings:GOOGLE_APPLICATION_CREDENTIALS").Value);
// ----------------

builder.Services.AddSingleton(FirebaseApp.Create());

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddScheme<AuthenticationSchemeOptions, FirebaseAuthenticationHandler>(JwtBearerDefaults.AuthenticationScheme, (o) => { });

builder.Services.AddDbContext<DataContext>(options => options.UseMongoDB(builder.Configuration.GetConnectionString("DefaultConnectionLog") ?? "", "trabuco"));

builder.Services.AddScoped<IVisitanteRepository, VisitanteRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IMedicacaoRepository, MedicacaoRepository>();
builder.Services.AddScoped<IRefeicaoRepository, RefeicaoRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors("ProdCors");
    app.UseHttpsRedirection();
    app.UseHsts();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();