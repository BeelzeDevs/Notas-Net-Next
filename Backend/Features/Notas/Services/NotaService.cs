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

        public async Task<List<Nota>> GetAllAsync() {
            return await _context.Notas.ToListAsync();
        }
        public async Task<Nota?> GetById(int id) {
            var nota = await _context.Notas.FirstOrDefaultAsync(n => n.Id == id);
            if (nota is null) return null;

            return nota;
        }
        public async Task<Nota> CreateAsync(NotaDTO dto)
        {
            var nota = new Nota
            {
                Titulo = dto.Titulo,
                Contenido = dto.Contenido,
                Archivada = dto.Archivada,
                FechaCreacion = dto.FechaCreacion
            };

            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();

            return await GetById(nota.Id) ?? throw new Exception("Error al crear Nota");
        }
        public async Task<bool> UpdateAsync(int id, NotaDTO dto)
        {
            var nota = await _context.Notas.FindAsync(id);
            if (nota is null) return false;

            nota.Titulo = dto.Titulo;
            nota.Contenido = dto.Contenido;
            nota.Archivada = dto.Archivada;
            nota.FechaModificacion = DateTime.Now;

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
            _context.Notas.RemoveRange(nota);
            await _context.SaveChangesAsync();
            return true;
            
        }

    }
}