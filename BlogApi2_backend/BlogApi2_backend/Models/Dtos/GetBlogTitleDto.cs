namespace BlogApi2_backend.Models.Dtos
{
    public class GetBlogTitleDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string AuthorName { get; set; }
    }
}
