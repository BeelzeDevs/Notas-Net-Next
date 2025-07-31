using Microsoft.EntityFrameworkCore;
using Backend.Models;
namespace Backend.Data
{
    public class BackendDbContext : DbContext
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options)
        {

        }
        public DbSet<Nota> Notas { get; set; } = null!;
        public DbSet<Categoria> Categorias { get; set; } = null!;
        public DbSet<NotaCategoria> NotaCategorias { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NotaCategoria>()
            .HasKey(nxc => new { nxc.NotaId, nxc.CategoriaId });
        }
    }
}