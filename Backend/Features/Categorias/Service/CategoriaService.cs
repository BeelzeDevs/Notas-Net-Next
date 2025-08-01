using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using System.Security.Cryptography.X509Certificates;

namespace Backend.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly BackendDbContext _context;
        public CategoriaService(BackendDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoriaReadDTO>> GetAllAsync()
        {
            return await _context.Categorias
                .Select(c => new CategoriaReadDTO { Id = c.Id, Nombre = c.Nombre })
                .ToListAsync();
        }
        public async Task<CategoriaReadDTO?> GetById(int id)
        {
            var categoria = await _context.Categorias
            .Select(c=> new CategoriaReadDTO {Id = c.Id, Nombre = c.Nombre})
            .FirstOrDefaultAsync(c => c.Id == id);
            if (categoria is null) return null;

            return categoria;
        }
        public async Task<CategoriaReadDTO> CreateAsync(CategoriaDTO dto)
        {
            var categoria = new Categoria
            {
                Nombre = dto.Nombre
            };

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return new CategoriaReadDTO { Id = categoria.Id, Nombre = categoria.Nombre };

        }
        public async Task<bool> UpdateAsync(int id, CategoriaDTO dto)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria is null) return false;

            categoria.Nombre = dto.Nombre;
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteAsync(int id)
        {
            var categoria = await _context.Categorias
            .Include(c => c.NotaCategorias)
            .FirstOrDefaultAsync(c => c.Id == id);

            if (categoria is null) return false;
            _context.NotaCategorias.RemoveRange(categoria.NotaCategorias);
            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;

        }
        
    }
}