using Backend.Models;
namespace Backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<NotexCategory> NotexCategory { get; set; } = new List<NotexCategory>();
    }
}