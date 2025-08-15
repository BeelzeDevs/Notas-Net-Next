using Microsoft.EntityFrameworkCore;
using Backend.Models;
namespace Backend.Data
{
    public class BackendDbContext : DbContext
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options)
        {

        }
        public DbSet<Note> Notes { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<NotexCategory> NotexCategory { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NotexCategory>()
            .HasKey(nxc => new { nxc.NoteId, nxc.CategoryId });

            // Corrección en postgres por ser case-sensitive 
            // Otra solución modificar el script y utilizar "Nota" , "Categoria", "Id". comillas.
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                // Nombre de tablas en minúscula
                entity.SetTableName(entity.GetTableName()?.ToLower());

                foreach (var property in entity.GetProperties())
                {
                    // Nombre columnas en minúscula
                    property.SetColumnName(property.Name.ToLower());
                }

                foreach (var key in entity.GetKeys())
                {
                    key.SetName(key.GetName()?.ToLower());
                }

                foreach (var fk in entity.GetForeignKeys())
                {
                    fk.SetConstraintName(fk.GetConstraintName()?.ToLower());
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.SetDatabaseName(index.GetDatabaseName()?.ToLower());
                }
            }
        }
    }
}