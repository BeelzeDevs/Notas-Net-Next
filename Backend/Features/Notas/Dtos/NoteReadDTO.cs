namespace Backend.DTOs
{
    public class NoteReadDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Content { get; set; } = string.Empty;
        public bool Filed { get; set; } = false;
        public DateTime DateCreation { get; set; } = DateTime.Now;
        public DateTime? DateModification { get; set; }
    }
}