namespace Backend.Models
{
    public class Nota
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = String.Empty;
        public string Contenido { get; set; } = string.Empty;
        public bool Archivada { get; set; } = false;
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public DateTime FechaModificacion { get; set; }

        public ICollection<NotaCategoria> NotaCategorias { get; set; } = new List<NotaCategoria>();

    }
}