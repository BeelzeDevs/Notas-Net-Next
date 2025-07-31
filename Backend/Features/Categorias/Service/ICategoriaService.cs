using Backend.Models;
using Backend.DTOs;
namespace Backend.Services
{
    public interface ICategoriaService
    {
        Task<List<Categoria>> GetAllAsync();
        Task<Categoria?> GetById(int id);
        Task<Categoria> CreateAsync(CategoriaDTO dto);
        Task<bool> UpdateAsync(int id, CategoriaDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}