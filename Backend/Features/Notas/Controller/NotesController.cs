using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _service;
        public NotesController(INoteService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var notas = await _service.GetAllAsync();
            return Ok(notas);
        }
        [HttpGet("filed/category/{id}")]
        public async Task<IActionResult> GetByCategoryIdFiled(int id)
        {
            var notas = await _service.GetByCategoryIdFiled(id);
            return Ok(notas);
        }
        [HttpGet("unfiled/category/{id}")]
        public async Task<IActionResult> GetByCategoryIdUnfiled(int id)
        {
            var notas = await _service.GetByCategoryIdUnfiled(id);
            return Ok(notas);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var found = await _service.GetById(id);
            return found is not null ? Ok(found) : NotFound($"Notes with id {id} not found");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NoteDTO dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] NoteDTO dto)
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
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var notes = await _service.GetNotesByCategoryAsync(categoryId);
            return Ok(notes);
        }
        
        // notas/search?query=texto
        [HttpGet("search")]
        public async Task<IActionResult> Buscar([FromQuery] string query)
        {
            var results = await _service.SearchNotesAsync(query);
            return Ok(results);
        }
        [HttpGet("actives")]
        public async Task<IActionResult> GetAllActives()
        {
            var results = await _service.GetActives();
            return Ok(results);
        }

        [HttpGet("filed")]
        public async Task<IActionResult> GetAllFiled()
        {
            var results = await _service.GetFiled();
            return Ok(results);
        }

        [HttpPut("{noteId}/toggle-filed")]
        public async Task<IActionResult> ToggleFiled(int noteId)
        {
            var result = await _service.ToggleFiledAsync(noteId);
            return result ? Ok("Note filed updated") : NotFound($"Note id {noteId} not found");
        }
    }
}