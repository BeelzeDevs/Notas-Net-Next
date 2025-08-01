using Backend.Services;
using Backend.Models;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

namespace Backend.Services
{
    public class NotaCategoriaService : INotaCategoriaService
    {
        private readonly BackendDbContext _context;
        public NotaCategoriaService(BackendDbContext context)
        {
            _context = context;
        }
        public async Task<List<CategoriaReadDTO>> GetAllCategoriasByNotaIdAsync(int NotaId)
        {
            return await _context.NotaCategorias
            .Include(nc => nc.Categoria)
            .Where(nc => nc.NotaId == NotaId)
            .Select(nc => new CategoriaReadDTO
            {
                Id = nc.CategoriaId,
                Nombre = nc.Categoria.Nombre
            })
            .ToListAsync();
        }

        public async Task<NotaCategoriaReadDTO?> CreateAsync(int NotaId, int CategoriaId)
        {
            var nota = await _context.Notas.FirstOrDefaultAsync(n => n.Id == NotaId);
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Id == CategoriaId);
            if (nota is null || categoria is null) return null;

            var notacategoriaAux = await _context.NotaCategorias.FirstOrDefaultAsync(nxc => nxc.NotaId == NotaId && nxc.CategoriaId == CategoriaId);
            if (notacategoriaAux is not null) return null;

            var notacategoria = new NotaCategoria
            {
                NotaId = NotaId,
                CategoriaId = CategoriaId
            };
            _context.NotaCategorias.Add(notacategoria);
            await _context.SaveChangesAsync();
            return new NotaCategoriaReadDTO{ NotaId = notacategoria.NotaId , CategoriaId = notacategoria.CategoriaId};
        }


        public async Task<bool> DeleteAsync(int NotaId, int CategoriaId)
        {
            var notacategoria = await _context.NotaCategorias
            .FirstOrDefaultAsync(nc => nc.NotaId == NotaId && nc.CategoriaId == CategoriaId);

            if (notacategoria is null) return false;
            _context.NotaCategorias.Remove(notacategoria);
            await _context.SaveChangesAsync();
            return true;

        }
    }
}
