namespace BlogApi2_backend.Models.Dtos
{
    public class AddComment
    {
        public required string CommentText { get; set; }

        // Date of comment creation (optional, server can set it)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Blog the comment is related to
        public required int BlogId { get; set; }

        public int AuthorId { get; set; }
    }
}
