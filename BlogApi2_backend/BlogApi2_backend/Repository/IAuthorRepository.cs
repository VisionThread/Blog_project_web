using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Repository
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<Author>> GetAllAuthors();
        Task<Author?> GetAuthorById(int id);
        Task<IEnumerable<Author>> GetAuthorByName(string name);
        Task AddAuthor(Author author);
        Task UpdateAuthor(Author author);
        Task<Author?> LoginAuthor(string email, string password);
    }
}
