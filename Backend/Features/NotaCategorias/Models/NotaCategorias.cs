using Backend.Models;
namespace Backend.Models
{
    public class NotaCategoria
    {
        public int NotaId { get; set; }
        public Nota Nota { get; set; } = null!;
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;
    }
}