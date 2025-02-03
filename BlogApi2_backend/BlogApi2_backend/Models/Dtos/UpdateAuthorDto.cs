namespace BlogApi2_backend.Models.Dtos
{
    public class UpdateAuthorDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
