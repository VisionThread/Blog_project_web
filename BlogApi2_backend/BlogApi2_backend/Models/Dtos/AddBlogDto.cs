using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Models.Dtos
{
    public class AddBlogDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int AuthorId { get; set; }

        
    }
}
