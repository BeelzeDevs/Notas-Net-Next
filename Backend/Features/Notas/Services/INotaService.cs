using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface INotaService
    {
        Task<List<Nota>> GetAllAsync();
        Task<Nota?> GetById(int id);
        Task<Nota> CreateAsync(NotaDTO dto);
        Task<bool> UpdateAsync(int id, NotaDTO dto);
        Task<bool> DeleteAsync(int id);

    }
}