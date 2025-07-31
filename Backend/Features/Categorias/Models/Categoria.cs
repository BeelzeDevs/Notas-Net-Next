using Backend.Models;
namespace Backend.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;

        public ICollection<NotaCategoria> NotaCategorias { get; set; } = new List<NotaCategoria>();
    }
}