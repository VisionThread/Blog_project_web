namespace BlogApi2_backend.Models.Dtos
{
    public class AddComment
    {
        public required string CommentText { get; set; }

        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

       
        public required int BlogId { get; set; }

        public int AuthorId { get; set; }
    }
}
