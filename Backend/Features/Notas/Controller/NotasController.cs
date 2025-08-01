using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotasController : ControllerBase
    {
        private readonly INotaService _service;
        public NotasController(INotaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var notas = await _service.GetAllAsync();
            return Ok(notas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var found = await _service.GetById(id);
            return found is not null ? Ok(found) : NotFound($"Notes with id {id} not found");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NotaDTO dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] NotaDTO dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated ? Ok("Note update succesful") : NotFound($"Note with id {id}, not found");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? Ok("Note deleted") : NotFound($"Note id not found, id {id}");
        }
        [HttpGet("categoria/{categoriaId}")]
        public async Task<IActionResult> GetByCategoria(int categoriaId)
        {
            var notas = await _service.GetNotasByCategoriaAsync(categoriaId);
            return Ok(notas);
        }
        
        // notas/buscar?query=texto
        [HttpGet("buscar")]
        public async Task<IActionResult> Buscar([FromQuery] string query)
        {
            var results = await _service.BuscarNotasAsync(query);
            return Ok(results);
        }
        [HttpGet("actives")]
        public async Task<IActionResult> GetAllActives()
        {
            var results = await _service.GetActives();
            return Ok(results);
        }

        [HttpGet("archived")]
        public async Task<IActionResult> GetAllArchived()
        {
            var results = await _service.GetArchived();
            return Ok(results);
        }

        [HttpPut("{notaId}/toggle-archivado")]
        public async Task<IActionResult> ToggleArchivado(int notaId)
        {
            var result = await _service.ToggleArchivadaAsync(notaId);
            return result ? Ok("Nota filed updated") : NotFound($"Nota id {notaId} not found");
        }
    }
}