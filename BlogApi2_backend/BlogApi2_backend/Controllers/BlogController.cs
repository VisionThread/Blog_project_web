using BlogApi2_backend.Configuration;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi2_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BlogController : ControllerBase
    {

        private readonly IBlogReadService _blogReadService;
        private readonly IBlogWriteService _blogWriteService;
        private readonly IBlogDeleteService _blogDeleteService;


        public BlogController(IBlogReadService blogReadService, IBlogWriteService blogWriteService, IBlogDeleteService blogDeleteService)

        {
            _blogReadService = blogReadService;
            _blogWriteService = blogWriteService;
            _blogDeleteService = blogDeleteService;
        }

        //to get all the blogs
        // GET: api/Blogs(to fetch all the existing blogs)
        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _blogReadService.GetBlogs();

            return Ok(blogs);
        }

        //get blog by title
        [HttpGet("title")]
        public async Task<IActionResult> GetBlogByTitle([FromQuery] string title)
        {
            var blogs = await _blogReadService.GetBlogByTitle(title);
            if (blogs == null)
            {
                return NotFound(new { Message = "No Blogs Found" });
            }

            return Ok(blogs);
        }

        //get blogs by id 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {

            var blog = await _blogReadService.GetBlogById(id);
            if (blog == null)
            {
                return NotFound(new { Message = "No Blogs Found" });
            }
            return Ok(BlogResponseMapper.MapToResponse(blog));


        }

        // Creating blog
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody] AddBlogDto addBlog)
        {

            var blog = await _blogWriteService.CreateBlog(addBlog);
            return Ok(blog);

        }

        // Updating a particular blog
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] UpdateBlogDto updateBlog)
        {

            var blogToUpdate = await _blogWriteService.UpdateBlog(id, updateBlog);
            if (!blogToUpdate)
            {
                return NotFound(new { Message = "Blog not found" });
            }

            return Ok(new { Message = "Blog updated successfully", Blog = blogToUpdate });



        }

        // Deleting a blog
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogById(int id)
        {

            var blogToDelete = await _blogDeleteService.DeleteBlogById(id);

            if (!blogToDelete)
            {
                return NotFound(new { Message = "Blog not found" });
            }
            return Ok(new { Message = "Blog deleted successfully" });


        }

        // Deleting all blogs
        [HttpDelete]
        public async Task<IActionResult> DeleteAllBlogs()
        {

            var blogsToBeDeleted = await _blogDeleteService.DeleteAllBlogs();

            if (!blogsToBeDeleted)
            {
                return NotFound("No blogs found to delete");
            }

            return Ok("All blogs deleted successfully");


        }


    }
}
