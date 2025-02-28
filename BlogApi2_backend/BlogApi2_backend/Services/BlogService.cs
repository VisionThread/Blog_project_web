using AutoMapper;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Services
{
    public class BlogService : IBlogReadService ,IBlogWriteService, IBlogDeleteService
    {
        private readonly BlogContext _dbcontext;

        private readonly IMapper _mapper;

        public BlogService(BlogContext dbcontext, IMapper mapper)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
        }

      

        public async Task<Blog?> GetBlogById(int id)
        {
            var blog = await _dbcontext.Blogs.Where(b => b.Id == id).Include(b => b.Author)
                   .FirstOrDefaultAsync();
           
            return blog;  // so even if it return null we can handle it in controller
        }

        public async Task<IEnumerable<GetBlogTitleDto>> GetBlogByTitle(string title)
        {
            var blog = await _dbcontext.Blogs
                   .Where(b => b.Title.ToLower().Contains(title.ToLower()))
                   .Include(b => b.Author)
                   .ToListAsync();

            var final_blog = _mapper.Map<List<GetBlogTitleDto>>(blog);
            return final_blog;
        }

        public async Task<IEnumerable<Blog>> GetBlogs()
        {
            var blogs = await _dbcontext.Blogs.ToListAsync();

            return blogs;
        }

        /// ------------------------------------------------Write services--------------------------------------------------------------------------------------------------------
        /// /

        public async Task<Blog> CreateBlog(AddBlogDto addBlog)
        {
            var blogEntity = _mapper.Map<Blog>(addBlog);
            blogEntity.CreatedAt = DateTime.Now;

            await _dbcontext.Blogs.AddAsync(blogEntity);
            await _dbcontext.SaveChangesAsync();

            return blogEntity;
        }


        public async Task<bool> UpdateBlog(int id, UpdateBlogDto updateBlog)
        {
            var blogToUpdate = _dbcontext.Blogs.FirstOrDefault(b => b.Id == id);
                  
            if(blogToUpdate == null)
            {
                return false;
            }

            blogToUpdate.Title = updateBlog.Title;
           
            blogToUpdate.Content = updateBlog.Content;

            await _dbcontext.SaveChangesAsync();
            return true;
        }



        /// ------------------------------------------------Deleting services--------------------------------------------------------------------------------------------------------
        /// /
        public async Task<bool> DeleteBlogById(int id)
        {
            var blogToDelete = await _dbcontext.Blogs.FirstOrDefaultAsync(b => b.Id == id);

            if (blogToDelete == null)
            {
                return false;
            }

            _dbcontext.Blogs.Remove(blogToDelete);
            await _dbcontext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAllBlogs()
        {
            var blogs = await _dbcontext.Blogs.ToListAsync();

            if (!blogs.Any())
            {
                return false;
            }

            _dbcontext.Blogs.RemoveRange(blogs);
            await _dbcontext.SaveChangesAsync();
            return true;
        }
    }
}
