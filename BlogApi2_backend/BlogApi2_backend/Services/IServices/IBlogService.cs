using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Services.IServices
{
    //Here we will implementing Interface segeration principle(ISP)
    //where To read the blogs there will be different interface
    // similary different interface for creation and updatation and deletion
    
    public interface IBlogReadService
    {
        Task<IEnumerable<Blog>> GetBlogs();
        Task<Blog?> GetBlogById(int id);

        Task<IEnumerable<GetBlogTitleDto>> GetBlogByTitle(string title);
    }  

    //interface for updation and deletion
    public interface IBlogWriteService
    {
        Task<Blog> CreateBlog(AddBlogDto addBlog);
        Task<bool> UpdateBlog(int id, UpdateBlogDto updateBlog);
    }

    public interface IBlogDeleteService
    {
        Task<bool> DeleteBlogById(int id);

        Task<bool> DeleteAllBlogs();
    }
}
