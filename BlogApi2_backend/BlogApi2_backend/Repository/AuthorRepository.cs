using AutoMapper.QueryableExtensions;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly BlogContext _dbcontext;

        public AuthorRepository(BlogContext dbcontext) 
        {
            _dbcontext = dbcontext;
        }
        public async Task AddAuthor(Author author)
        {
            await _dbcontext.Authors.AddAsync(author);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Author>> GetAllAuthors()
        {
            var authors = await _dbcontext.Authors.ToListAsync();
            return authors;
        }

        public async Task<Author?> GetAuthorById(int id)
        {
            return await _dbcontext.Authors
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Author?> GetAuthorByName(string name)
        {
            return await _dbcontext.Authors
                .Include(a => a.Blogs)
                .FirstOrDefaultAsync(a => a.Name.ToLower() == name.ToLower());
        }

        public async Task<Author?> LoginAuthor(string email, string password)
        {
            return await _dbcontext.Authors
                    .FirstOrDefaultAsync(a => a.Email == email && a.Password == password);

        }

        public async Task UpdateAuthor(Author author)
        {
            _dbcontext.Authors.Update(author);
            await _dbcontext.SaveChangesAsync();
        }
    }
}
