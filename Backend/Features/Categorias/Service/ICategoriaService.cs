using Backend.Models;
using Backend.DTOs;
namespace Backend.Services
{
    public interface ICategoriaService
    {
        Task<List<CategoriaReadDTO>> GetAllAsync();
        Task<CategoriaReadDTO?> GetById(int id);
        Task<CategoriaReadDTO> CreateAsync(CategoriaDTO dto);
        Task<bool> UpdateAsync(int id, CategoriaDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}