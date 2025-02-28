namespace BlogApi2_backend.Models.Entities
{
    public class Blog
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int AuthorId { get; set; }

        // Navigation Property to Author (for easier access)
        public Author? Author { get; set; }

        //for comments or feedback
        public List<Comments> Comments { get; set; } = new List<Comments>();

    }
}
