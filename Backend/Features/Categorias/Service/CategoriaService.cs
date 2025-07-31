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

        public async Task<List<Categoria>> GetAllAsync()
        {
            return await _context.Categorias.ToListAsync();
        }
        public async Task<Categoria?> GetById(int id)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id);
            if (categoria is null) return null;

            return categoria;
        }
        public async Task<Categoria> CreateAsync(CategoriaDTO dto)
        {
            var categoria = new Categoria
            {
                Nombre = dto.Nombre
            };

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return await GetById(categoria.Id) ?? throw new Exception("Error al crear Categoria");

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
            _context.Categorias.RemoveRange(categoria);
            await _context.SaveChangesAsync();
            return true;

        }
        
    }
}