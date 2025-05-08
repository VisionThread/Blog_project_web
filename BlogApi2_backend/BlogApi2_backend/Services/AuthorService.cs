using AutoMapper;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Repository;
using BlogApi2_backend.Services.IServices;

namespace BlogApi2_backend.Services
{
    public class AuthorService : IAuthorService, IAuthorWriteService
    {
        private readonly IMapper _mapper;
        private readonly IAuthorRepository _authorRepository;

        public AuthorService(IMapper mapper, IAuthorRepository authorRepository)
        {

            _mapper = mapper;
            _authorRepository = authorRepository;
        }

        public async Task<IEnumerable<Author>> GetAllAuthors()
        {
            return await _authorRepository.GetAllAuthors();
        }

        public async Task<GetAuthorDto?> GetAuthorById(int id)
        {
            var author = await _authorRepository.GetAuthorById(id);
            return _mapper.Map<GetAuthorDto>(author);                                                                 // Map the Author entity to GetAuthorDto
        }

        public async Task<IEnumerable<GetAuthorDto?>> GetAuthorByName(string name)
        {
            var author = await _authorRepository.GetAuthorByName(name);
            return _mapper.Map<IEnumerable<GetAuthorDto>>(author);
            //return author;

        }

        /// ------------------------------------------------CRUD methods here----------------------------------------------------------
        /// 

        public async Task<Author> LoginAuthor(LoginDto loginDto)
        {
            var author = await _authorRepository.LoginAuthor(loginDto.Email, loginDto.Password);
            if (author == null)
            {
                throw new ArgumentException("Invalid email or password");
            }
            return author;
        }

        public async Task<Author> RegisterAuthor(AddAuthor addAuthor)
        {
            var existingAuthor = await _authorRepository.GetAuthorByName(addAuthor.Email);
            if (existingAuthor != null)
            {
                throw new ArgumentException("Email is already registered!");
            }

            var authorEntity = _mapper.Map<Author>(addAuthor);
            await _authorRepository.AddAuthor(authorEntity);
            return authorEntity;
        }

        public async Task<Author> UpdateDetailAuthor(int id, UpdateAuthorDto updateAuthorDto)
        {
            var author = await _authorRepository.GetAuthorById(id);
            if (author == null)
            {
                throw new KeyNotFoundException("Author not found");
            }
            author.Name = updateAuthorDto.Name ?? author.Name;
            author.Email = updateAuthorDto.Email ?? author.Email;
            if (!string.IsNullOrEmpty(updateAuthorDto.Password))
            {
                author.Password = updateAuthorDto.Password;
            }
            await _authorRepository.UpdateAuthor(author);
            return author;
        }
    }
}
