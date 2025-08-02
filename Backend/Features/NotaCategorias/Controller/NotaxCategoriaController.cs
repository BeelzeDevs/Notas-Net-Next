using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotaxCategoriaController : ControllerBase
    {
        private readonly INotaCategoriaService _service;
        public NotaxCategoriaController(INotaCategoriaService service)
        {
            _service = service;
        }

        [HttpGet("{NotaId}")]
        public async Task<IActionResult> GetAllCategoriasByNotaId(int NotaId)
        {
            var categorias = await _service.GetAllCategoriasByNotaIdAsync(NotaId);
            return Ok(categorias);
        }

        [HttpPost("{NotaId}/add/{CategoriaId}")]
        public async Task<IActionResult> Create(int NotaId, int CategoriaId)
        {
            NotaCategoriaReadDTO? notacategoria = await _service.CreateAsync(NotaId, CategoriaId);
            return notacategoria is not null ? Ok(notacategoria) : NotFound("Already exist");
        }

        [HttpDelete("{NotaId}/{CategoriaId}")]
        public async Task<IActionResult> Delete(int NotaId, int CategoriaId)
        {
            var deleted = await _service.DeleteAsync(NotaId, CategoriaId);
            return deleted ? Ok($"Category deleted from {NotaId}") : NotFound($"Category Category id:{CategoriaId} not found in Notaid : {NotaId}");
        }
    }
}