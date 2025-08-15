namespace Backend.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Content { get; set; } = string.Empty;
        public bool Filed { get; set; } = false;
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;
        public DateTime? DateModification { get; set; }

        public ICollection<NotexCategory> NotexCategories { get; set; } = new List<NotexCategory>();

    }
}