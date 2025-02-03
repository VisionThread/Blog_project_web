using System.Reflection.Metadata;

namespace BlogApi2_backend.Models.Entities
{
    public class Author
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }

        public required string Password { get; set; }
        public List<Blog> Blogs { get; set; } = new List<Blog>();

    }
}
