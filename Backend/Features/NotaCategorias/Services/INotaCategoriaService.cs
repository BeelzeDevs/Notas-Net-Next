using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface INotaCategoriaService
    {
        Task<List<CategoriaReadDTO>> GetAllCategoriasByNotaIdAsync(int NotaId);
        Task<NotaCategoriaReadDTO?> CreateAsync(int NotaId, int CategoriaId);
        Task<bool> DeleteAsync(int NotaId, int CategoriaId);

    }
}