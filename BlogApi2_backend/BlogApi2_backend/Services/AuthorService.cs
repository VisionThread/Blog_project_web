using AutoMapper;
using AutoMapper.QueryableExtensions;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Services
{
    public class AuthorService : IAuthorService,IAuthorWriteService
    {
        private readonly BlogContext _dbcontext;

        private readonly IMapper _mapper;

        public AuthorService(BlogContext dbcontext, IMapper mapper)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Author>> GetAllAuthors()
        {
            var authors = await _dbcontext.Authors.ToListAsync();
            return authors;
        }

        public async Task<GetAuthorDto?> GetAuthorById(int id)
        {
            return await _dbcontext.Authors
                              .Where(a => a.Id == id)                                                                                                      //Filters the authors to get the one with the matching id.
                              .ProjectTo<GetAuthorDto>(_mapper.ConfigurationProvider)                                                                                                              //Uses AutoMapper to transform the query results into AuthorDto objects. This method reads your mapping configuration and selects only the necessary fields.
                              .FirstOrDefaultAsync();
            
        }

        public async Task<GetAuthorDto?> GetAuthorByName(string name)
        {
            return await _dbcontext.Authors
                             .Where(a => a.Name.ToLower() == name.ToLower())
                             .ProjectTo<GetAuthorDto>(_mapper.ConfigurationProvider)
                             .FirstOrDefaultAsync();
           
        }

        /// ------------------------------------------------CRUD methods here----------------------------------------------------------
        /// 
        
        public async Task<Author> LoginAuthor(LoginDto loginDto)
        {
            var author= await _dbcontext.Authors
                    .FirstOrDefaultAsync(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

            return author;
        }

        public async Task<Author> RegisterAuthor(AddAuthor addAuthor)
        {
            var existingAuthor = await _dbcontext.Authors                                                                                           // Check if the email is already in use asynchronously
                    .FirstOrDefaultAsync(a => a.Email == addAuthor.Email);

            if (existingAuthor != null)
            {
                throw new ArgumentException("Email is already registered!");
            }
            var authorEntity = _mapper.Map<Author>(addAuthor);
            await _dbcontext.Authors.AddAsync(authorEntity);                                                                  // Add the new Author entity to the database asynchronously
            await _dbcontext.SaveChangesAsync();

            return authorEntity;
        }

        public async Task<Author> UpdateDetailAuthor(int id, UpdateAuthorDto updateAuthorDto)
        {
            var author = await _dbcontext.Authors.FirstOrDefaultAsync(a => a.Id == id);
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
            // Save the changes asynchronously
            await _dbcontext.SaveChangesAsync();
            
            return author;
        }
    }
}
