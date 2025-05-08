namespace BlogApi2_backend.Models.Dtos
{
    public class UpdateBlogDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }

        public required DateTime CreatedAt { get; set; }
        public int AuthorId { get; set; }
    }
}
