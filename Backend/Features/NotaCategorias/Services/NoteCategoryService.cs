using Backend.Services;
using Backend.Models;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

namespace Backend.Services
{
    public class NoteCategoryService : INoteCategoryService
    {
        private readonly BackendDbContext _context;
        public NoteCategoryService(BackendDbContext context)
        {
            _context = context;
        }
        public async Task<List<CategoryReadDTO>> GetAllCategoriesByNoteIdAsync(int NoteId)
        {
            return await _context.NotexCategory
            .Include(nc => nc.Category)
            .Where(nc => nc.NoteId == NoteId)
            .Select(nc => new CategoryReadDTO
            {
                Id = nc.CategoryId,
                Name = nc.Category.Name
            })
            .ToListAsync();
        }

        public async Task<NotexCategoryReadDTO?> CreateAsync(int NoteId, int CategoryId)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == NoteId);
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == CategoryId);
            if (note is null || category is null) return null;

            var notecategoryAux = await _context.NotexCategory.FirstOrDefaultAsync(nxc => nxc.NoteId == NoteId && nxc.CategoryId == CategoryId);
            if (notecategoryAux is not null) return null;

            var notecategory = new NotexCategory
            {
                NoteId = NoteId,
                CategoryId = CategoryId
            };
            _context.NotexCategory.Add(notecategory);
            await _context.SaveChangesAsync();
            return new NotexCategoryReadDTO{ NoteId = notecategory.NoteId , CategoryId = notecategory.CategoryId};
        }


        public async Task<bool> DeleteAsync(int NoteId, int CategoryId)
        {
            var notecategoryToDelete = await _context.NotexCategory
            .FirstOrDefaultAsync(nc => nc.NoteId == NoteId && nc.CategoryId == CategoryId);

            if (notecategoryToDelete is null) return false;
            _context.NotexCategory.Remove(notecategoryToDelete);
            await _context.SaveChangesAsync();
            return true;

        }
    }
}
