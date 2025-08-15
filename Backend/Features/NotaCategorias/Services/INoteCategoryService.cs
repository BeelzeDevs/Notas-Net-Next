using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface INoteCategoryService
    {
        Task<List<CategoryReadDTO>> GetAllCategoriesByNoteIdAsync(int NoteId);
        Task<NotexCategoryReadDTO?> CreateAsync(int NoteId, int CategoryId);
        Task<bool> DeleteAsync(int NoteId, int CategoryId);

    }
}