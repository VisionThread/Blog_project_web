namespace BlogApi2_backend.Models.Dtos
{
    public class BlogDto
    {
        public int BlogId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
