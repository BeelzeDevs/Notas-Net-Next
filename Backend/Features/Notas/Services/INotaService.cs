using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface INotaService
    {
        Task<List<NotaReadDTO>> GetAllAsync();
        Task<List<NotaReadDTO>> GetByCategoriaIdArchivadas(int categoriaId);
        Task<List<NotaReadDTO>> GetByCategoriaIdNoArchivadas(int categoriaId);
        Task<NotaReadDTO?> GetById(int id);
        Task<NotaReadDTO> CreateAsync(NotaDTO dto);
        Task<bool> UpdateAsync(int id, NotaDTO dto);
        Task<bool> DeleteAsync(int id);
        Task<List<NotaReadDTO>> GetNotasByCategoriaAsync(int categoriaId);
        Task<List<NotaReadDTO>> BuscarNotasAsync(string query);
        Task<bool> ToggleArchivadaAsync(int notaId);
        Task<List<NotaReadDTO>> GetActives();
        Task<List<NotaReadDTO>> GetArchived();
        

    }
}