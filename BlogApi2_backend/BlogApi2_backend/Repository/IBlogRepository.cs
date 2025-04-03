using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Repository
{
    public interface IBlogRepository
    {
        Task<Blog?> GetBlogById(int id);
        Task<IEnumerable<Blog>> GetBlogs();
        Task<IEnumerable<Blog>> GetBlogsByTitle(string title);
        Task CreateBlog(Blog blog);
        Task UpdateBlog(Blog blog);
        Task DeleteBlog(Blog blog);
        Task DeleteAllBlogs();
    }
}
