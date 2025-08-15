using Backend.Data;
using Backend.Services;
using Backend.Models;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class NoteService : INoteService
    {
        private readonly BackendDbContext _context;
        public NoteService(BackendDbContext context)
        {
            _context = context;
        }

        public async Task<List<NoteReadDTO>> GetAllAsync()
        {
            return await _context.Notes
            .Select(n => new NoteReadDTO
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                Filed = n.Filed,
                DateCreation = n.DateCreation,
                DateModification = n.DateModification
            })
            .ToListAsync();
        }
        public async Task<List<NoteReadDTO>> GetByCategoryIdFiled(int categoryId)
        {
            return await _context.NotexCategory
            .Include(nc => nc.Note)
            .Include(nc => nc.Category)
            .Where(nc => nc.CategoryId == categoryId && nc.Note.Filed == true)
            .Select(nc=> new NoteReadDTO
            {
                Id = nc.Note.Id,
                Title = nc.Note.Title,
                Content = nc.Note.Content,
                Filed = nc.Note.Filed,
                DateCreation = nc.Note.DateCreation,
                DateModification = nc.Note.DateModification
            })
            .ToListAsync();
        }
        public async Task<List<NoteReadDTO>> GetByCategoryIdUnfiled(int categoryId)
        {
            return await _context.NotexCategory
            .Include(nc => nc.Note)
            .Include(nc => nc.Category)
            .Where(nc => nc.CategoryId == categoryId && nc.Note.Filed == false)
            .Select(nc=> new NoteReadDTO
            {
                Id = nc.Note.Id,
                Title = nc.Note.Title,
                Content = nc.Note.Content,
                Filed = nc.Note.Filed,
                DateCreation = nc.Note.DateCreation,
                DateModification = nc.Note.DateModification
            })
            .ToListAsync();
        }
        public async Task<NoteReadDTO?> GetById(int id)
        {
            var note = await _context.Notes
            .Select(n => new NoteReadDTO
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                Filed = n.Filed,
                DateCreation = n.DateCreation,
                DateModification = n.DateModification
            })
            .FirstOrDefaultAsync(n => n.Id == id);
            if (note is null) return null;

            return note;
        }
        public async Task<NoteReadDTO> CreateAsync(NoteDTO dto)
        {
            var note = new Note
            {
                Title = dto.Title,
                Content = dto.Content,
                Filed = dto.Filed,
                DateCreation = DateTime.UtcNow,
                DateModification = null
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return new NoteReadDTO
            {
                Id = note.Id,
                Title = note.Title,
                Content = note.Content,
                Filed = note.Filed,
                DateCreation = note.DateCreation,
                DateModification = note.DateModification
            };
        }
        public async Task<bool> UpdateAsync(int id, NoteDTO dto)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note is null) return false;

            note.Title = dto.Title;
            note.Content = dto.Content;
            note.Filed = dto.Filed;
            note.DateModification = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteAsync(int id)
        {
            var note = await _context.Notes
            .Include(n => n.NotexCategories)
            .FirstOrDefaultAsync(c => c.Id == id);

            if (note is null) return false;
            _context.NotexCategory.RemoveRange(note.NotexCategories);
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<List<NoteReadDTO>> GetNotesByCategoryAsync(int categoryId)
        {
            return await _context.NotexCategory
                .Where(nc => nc.CategoryId == categoryId)
                .Include(nc => nc.Note)
                .Select(nc => new NoteReadDTO
                {
                    Id = nc.NoteId,
                    Title = nc.Note.Title,
                    Content = nc.Note.Content,
                    DateCreation = nc.Note.DateCreation,
                    Filed = nc.Note.Filed
                })
                .ToListAsync();
        }

        public async Task<List<NoteReadDTO>> SearchNotesAsync(string searchTerm)
        {
            return await _context.Notes
                .Where(n => EF.Functions.ILike(n.Title, $"%{searchTerm}%") || EF.Functions.ILike(n.Content, $"%{searchTerm}%"))
                .Select(n => new NoteReadDTO
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                    DateCreation = n.DateCreation,
                    Filed = n.Filed
                })
                .ToListAsync();
        }

        public async Task<bool> ToggleFiledAsync(int noteId)
        {
            var note = await _context.Notes.FindAsync(noteId);
            if (note is null) return false;

            note.Filed = !note.Filed;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<NoteReadDTO>> GetActives()
        {
            return await _context.Notes
            .Where(n => n.Filed == false)
            .Select(n=> new NoteReadDTO
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                DateCreation = n.DateCreation,
                Filed = n.Filed,
                DateModification = n.DateModification
            })
            .ToListAsync();
        }
        public async Task<List<NoteReadDTO>> GetFiled()
        {
            return await _context.Notes
            .Where(n => n.Filed == true)
            .Select(n=> new NoteReadDTO
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                DateCreation = n.DateCreation,
                Filed = n.Filed,
                DateModification = n.DateModification
            })
            .ToListAsync();
        }

    }
}