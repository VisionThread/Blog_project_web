using AutoMapper;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Repository;
using BlogApi2_backend.Services.IServices;

namespace BlogApi2_backend.Services
{
    public class BlogService : IBlogReadService, IBlogWriteService, IBlogDeleteService
    {

        private readonly IMapper _mapper;
        private readonly IBlogRepository _blogRepository;

        public BlogService(IMapper mapper, IBlogRepository blogRepository)
        {

            _mapper = mapper;
            _blogRepository = blogRepository;
        }

        public async Task<Blog?> GetBlogById(int id)
        {

            var blog = await _blogRepository.GetBlogById(id);
            if (blog == null)
            {
                throw new ArgumentException("No Blogs Found");
            }
            return await _blogRepository.GetBlogById(id);
        }

        public async Task<IEnumerable<GetBlogTitleDto>> GetBlogByTitle(string title)
        {
            var blogs = await _blogRepository.GetBlogsByTitle(title);

            var final_blog = _mapper.Map<List<GetBlogTitleDto>>(blogs);
            return final_blog;
        }

        public async Task<IEnumerable<Blog>> GetBlogs()
        {
            var blogs = await _blogRepository.GetBlogs();

            return blogs;
        }

        /// ------------------------------------------------Write services--------------------------------------------------------------------------------------------------------
        /// /

        public async Task<Blog> CreateBlog(AddBlogDto addBlog)
        {
            var blogEntity = _mapper.Map<Blog>(addBlog);
            blogEntity.CreatedAt = DateTime.Now;

            await _blogRepository.CreateBlog(blogEntity);

            return blogEntity;

        }


        public async Task<bool> UpdateBlog(int id, UpdateBlogDto updateBlog)
        {

            var blogToUpdate = await _blogRepository.GetBlogById(id);

            if (blogToUpdate == null)
            {
                return false;
            }

            blogToUpdate.Title = updateBlog.Title;

            blogToUpdate.Content = updateBlog.Content;

            blogToUpdate.CreatedAt = DateTime.UtcNow;

            await _blogRepository.UpdateBlog(blogToUpdate);
            return true;
        }



        /// ------------------------------------------------Deleting services--------------------------------------------------------------------------------------------------------
        /// /
        public async Task<bool> DeleteBlogById(int id)
        {

            var blogToDelete = await _blogRepository.GetBlogById(id);

            if (blogToDelete == null)
            {
                return false;
            }

            await _blogRepository.DeleteBlog(blogToDelete);
            return true;

        }

        public async Task<bool> DeleteAllBlogs()
        {
            await _blogRepository.DeleteAllBlogs();
            return true;
        }
    }
}
