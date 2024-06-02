using backend.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace backend.Data
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Usuario> Usuarios { get; init; }
        public DbSet<Medicacao> Medicacoes { get; init; }
        public DbSet<Refeicao> Refeicoes { get; init; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>().ToCollection("usuarios");

            modelBuilder.Entity<Medicacao>().ToCollection("medicacoes");

            modelBuilder.Entity<Refeicao>().ToCollection("refeicoes");
        }
    }
}