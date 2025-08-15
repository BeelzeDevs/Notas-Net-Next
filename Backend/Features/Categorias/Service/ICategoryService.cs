using Backend.Models;
using Backend.DTOs;
namespace Backend.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryReadDTO>> GetAllAsync();
        Task<CategoryReadDTO?> GetById(int id);
        Task<CategoryReadDTO> CreateAsync(CategoryDTO dto);
        Task<bool> UpdateAsync(int id, CategoryDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}