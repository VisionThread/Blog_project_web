namespace BlogApi2_backend.Models.Entities
{
    public class Comments
    {
        public int Id { get; set; }
        public required string CommentText { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign Key for Blog
        public int BlogId { get; set; }
        public int AuthorId { get; set; }

    }
}
