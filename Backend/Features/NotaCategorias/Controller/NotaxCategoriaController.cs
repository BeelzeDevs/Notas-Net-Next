using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotexCategoriesController : ControllerBase
    {
        private readonly INoteCategoryService _service;
        public NotexCategoriesController(INoteCategoryService service)
        {
            _service = service;
        }

        [HttpGet("{NoteId}")]
        public async Task<IActionResult> GetAllCategoriesByNotaId(int NoteId)
        {
            var categories = await _service.GetAllCategoriesByNoteIdAsync(NoteId);
            return Ok(categories);
        }

        [HttpPost("{NoteId}/add/{CategoryId}")]
        public async Task<IActionResult> Create(int NoteId, int CategoryId)
        {
            NotexCategoryReadDTO? notecategory = await _service.CreateAsync(NoteId, CategoryId);
            return notecategory is not null ? Ok(notecategory) : NotFound("Already exist");
        }

        [HttpDelete("{NoteId}/{CategoryId}")]
        public async Task<IActionResult> Delete(int NoteId, int CategoryId)
        {
            var deleted = await _service.DeleteAsync(NoteId, CategoryId);
            return deleted
            ? Ok($"Category deleted from {NoteId}")
            : NotFound($"Category id:{CategoryId} not found in Nota id:{NoteId}");
        }
    }
}