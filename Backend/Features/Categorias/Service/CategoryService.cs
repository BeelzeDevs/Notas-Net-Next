using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using System.Security.Cryptography.X509Certificates;

namespace Backend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly BackendDbContext _context;
        public CategoryService(BackendDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryReadDTO>> GetAllAsync()
        {
            return await _context.Categories
                .Select(c => new CategoryReadDTO { Id = c.Id, Name = c.Name })
                .ToListAsync();
        }
        public async Task<CategoryReadDTO?> GetById(int id)
        {
            var categoria = await _context.Categories
            .Select(c=> new CategoryReadDTO {Id = c.Id, Name = c.Name})
            .FirstOrDefaultAsync(c => c.Id == id);
            if (categoria is null) return null;

            return categoria;
        }
        public async Task<CategoryReadDTO> CreateAsync(CategoryDTO dto)
        {
            var categoria = new Category
            {
                Name = dto.Name
            };

            _context.Categories.Add(categoria);
            await _context.SaveChangesAsync();
            return new CategoryReadDTO { Id = categoria.Id, Name = categoria.Name };

        }
        public async Task<bool> UpdateAsync(int id, CategoryDTO dto)
        {
            var categoria = await _context.Categories.FindAsync(id);
            if (categoria is null) return false;

            categoria.Name = dto.Name;
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteAsync(int id)
        {
            var categoria = await _context.Categories
            .Include(c => c.NotexCategory)
            .FirstOrDefaultAsync(c => c.Id == id);

            if (categoria is null) return false;
            _context.NotexCategory.RemoveRange(categoria.NotexCategory);
            _context.Categories.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;

        }
        
    }
}