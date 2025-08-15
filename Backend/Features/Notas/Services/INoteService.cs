using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface INoteService
    {
        Task<List<NoteReadDTO>> GetAllAsync();
        Task<List<NoteReadDTO>> GetByCategoryIdFiled(int categoryId);
        Task<List<NoteReadDTO>> GetByCategoryIdUnfiled(int categoryId);
        Task<NoteReadDTO?> GetById(int id);
        Task<NoteReadDTO> CreateAsync(NoteDTO dto);
        Task<bool> UpdateAsync(int id, NoteDTO dto);
        Task<bool> DeleteAsync(int id);
        Task<List<NoteReadDTO>> GetNotesByCategoryAsync(int categoryId);
        Task<List<NoteReadDTO>> SearchNotesAsync(string query);
        Task<bool> ToggleFiledAsync(int noteId);
        Task<List<NoteReadDTO>> GetActives();
        Task<List<NoteReadDTO>> GetFiled();
        

    }
}