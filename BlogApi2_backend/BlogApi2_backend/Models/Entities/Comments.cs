namespace BlogApi2_backend.Models.Entities
{
    public class Comments
    {
        public int Id { get; set; }
        public required string CommentText { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign Key for Blog
        public int BlogId { get; set; }

        // Navigation Property to Blog
        public Blog Blog { get; set; }

        //navigation to authors as well
        // Optional: If you want to track who posted the comment
        public int AuthorId { get; set; }

    }
}
