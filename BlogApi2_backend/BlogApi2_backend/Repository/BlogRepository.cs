using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private readonly BlogContext _dbcontext;

        public BlogRepository(BlogContext dbContext)
        {
            _dbcontext = dbContext;
        }
        public async Task CreateBlog(Blog blog)
        {
            await _dbcontext.Blogs.AddAsync(blog);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task DeleteAllBlogs()
        {
            var blogs = await _dbcontext.Blogs.ToListAsync();
            _dbcontext.Blogs.RemoveRange(blogs);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task DeleteBlog(Blog blog)
        {
            _dbcontext.Blogs.Remove(blog);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<Blog?> GetBlogById(int id)
        {
            var blog = await _dbcontext.Blogs.Where(b => b.Id == id).Include(b => b.Author)
                   .FirstOrDefaultAsync();

            return blog;
        }

        public async Task<IEnumerable<Blog>> GetBlogs()
        {
            return await _dbcontext.Blogs.ToListAsync();
        }

        public async Task<IEnumerable<Blog>> GetBlogsByTitle(string title)
        {
            return await _dbcontext.Blogs
                   .Where(b => b.Title.ToLower().Contains(title.ToLower()))
                   .Include(b => b.Author)
                   .ToListAsync();
        }

        public async Task UpdateBlog(Blog blog)
        {
            _dbcontext.Blogs.Update(blog);
            await _dbcontext.SaveChangesAsync();
        }
    }
}
