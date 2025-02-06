namespace BlogApi2_backend.Models.Dtos
{
    public class GetAuthorDto
    {
        public int AuthorId { get; set; }
        public required string AuthorName { get; set; }

        public List<BlogDto> Blogs { get; set; }
    }
}
