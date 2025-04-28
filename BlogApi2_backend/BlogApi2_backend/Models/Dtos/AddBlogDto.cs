namespace BlogApi2_backend.Models.Dtos
{
    public class AddBlogDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public required int AuthorId { get; set; }


    }
}
