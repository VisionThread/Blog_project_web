using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Services.IServices
{
    public interface IAuthorService
    {
        Task<IEnumerable<Author>> GetAllAuthors();

        Task<GetAuthorDto?> GetAuthorById(int id);

        Task<GetAuthorDto?> GetAuthorByName(string name);
    }

    public interface IAuthorWriteService
    {
        Task<Author> RegisterAuthor(AddAuthor addAuthor);
        Task<Author> LoginAuthor(LoginDto loginDto);

        Task<Author> UpdateDetailAuthor(int id, UpdateAuthorDto updateAuthorDto);

    }
}
