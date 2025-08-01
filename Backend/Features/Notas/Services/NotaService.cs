using Backend.Data;
using Backend.Services;
using Backend.Models;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class NotaService : INotaService
    {
        private readonly BackendDbContext _context;
        public NotaService(BackendDbContext context)
        {
            _context = context;
        }

        public async Task<List<NotaReadDTO>> GetAllAsync()
        {
            return await _context.Notas
            .Select(n => new NotaReadDTO
            {
                Id = n.Id,
                Titulo = n.Titulo,
                Contenido = n.Contenido,
                Archivada = n.Archivada,
                FechaCreacion = n.FechaCreacion,
                FechaModificacion = n.FechaModificacion
            })
            .ToListAsync();
        }
        public async Task<NotaReadDTO?> GetById(int id)
        {
            var nota = await _context.Notas
            .Select(n => new NotaReadDTO
            {
                Id = n.Id,
                Titulo = n.Titulo,
                Contenido = n.Contenido,
                Archivada = n.Archivada,
                FechaCreacion = n.FechaCreacion,
                FechaModificacion = n.FechaModificacion
            })
            .FirstOrDefaultAsync(n => n.Id == id);
            if (nota is null) return null;

            return nota;
        }
        public async Task<NotaReadDTO> CreateAsync(NotaDTO dto)
        {
            var nota = new Nota
            {
                Titulo = dto.Titulo,
                Contenido = dto.Contenido,
                Archivada = dto.Archivada,
                FechaCreacion = DateTime.UtcNow,
                FechaModificacion = DateTime.UtcNow
            };

            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();

            return new NotaReadDTO
            {
                Id = nota.Id,
                Titulo = nota.Titulo,
                Contenido = nota.Contenido,
                Archivada = nota.Archivada,
                FechaCreacion = nota.FechaCreacion,
                FechaModificacion = nota.FechaModificacion
            };
        }
        public async Task<bool> UpdateAsync(int id, NotaDTO dto)
        {
            var nota = await _context.Notas.FindAsync(id);
            if (nota is null) return false;

            nota.Titulo = dto.Titulo;
            nota.Contenido = dto.Contenido;
            nota.Archivada = dto.Archivada;
            nota.FechaModificacion = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteAsync(int id)
        {
            var nota = await _context.Notas
            .Include(n => n.NotaCategorias)
            .FirstOrDefaultAsync(c => c.Id == id);

            if (nota is null) return false;
            _context.NotaCategorias.RemoveRange(nota.NotaCategorias);
            _context.Notas.Remove(nota);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<List<NotaReadDTO>> GetNotasByCategoriaAsync(int categoriaId)
        {
            return await _context.NotaCategorias
                .Where(nc => nc.CategoriaId == categoriaId)
                .Include(nc => nc.Nota)
                .Select(nc => new NotaReadDTO
                {
                    Id = nc.Nota.Id,
                    Titulo = nc.Nota.Titulo,
                    Contenido = nc.Nota.Contenido,
                    FechaCreacion = nc.Nota.FechaCreacion,
                    Archivada = nc.Nota.Archivada
                })
                .ToListAsync();
        }

        public async Task<List<NotaReadDTO>> BuscarNotasAsync(string searchTerm)
        {
            return await _context.Notas
                .Where(n => EF.Functions.ILike(n.Titulo, $"%{searchTerm}%") || EF.Functions.ILike(n.Contenido, $"%{searchTerm}%"))
                .Select(n => new NotaReadDTO
                {
                    Id = n.Id,
                    Titulo = n.Titulo,
                    Contenido = n.Contenido,
                    FechaCreacion = n.FechaCreacion,
                    Archivada = n.Archivada
                })
                .ToListAsync();
        }

        public async Task<bool> ToggleArchivadaAsync(int notaId)
        {
            var nota = await _context.Notas.FindAsync(notaId);
            if (nota is null) return false;

            nota.Archivada = !nota.Archivada;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<NotaReadDTO>> GetActives()
        {
            return await _context.Notas
            .Where(n => n.Archivada == false)
            .Select(n=> new NotaReadDTO
            {
                Id = n.Id,
                Titulo = n.Titulo,
                Contenido = n.Contenido,
                FechaCreacion = n.FechaCreacion,
                Archivada = n.Archivada,
                FechaModificacion = n.FechaModificacion
            })
            .ToListAsync();
        }
        public async Task<List<NotaReadDTO>> GetArchived()
        {
            return await _context.Notas
            .Where(n => n.Archivada == true)
            .Select(n=> new NotaReadDTO
            {
                Id = n.Id,
                Titulo = n.Titulo,
                Contenido = n.Contenido,
                FechaCreacion = n.FechaCreacion,
                Archivada = n.Archivada,
                FechaModificacion = n.FechaModificacion
            })
            .ToListAsync();
        }

    }
}