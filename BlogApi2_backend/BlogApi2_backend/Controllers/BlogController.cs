using System.Reflection.Metadata;
using System.Xml.Linq;
using AutoMapper;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BlogApi2_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogContext _dbcontext;
        private readonly IMapper _mapper;

        public BlogController(BlogContext dbcontext,IMapper mapper)
        {
            _dbcontext = dbcontext;
            this._mapper = mapper;
        }

        //to get all the blogs
        // GET: api/Blogs(to fetch all the existing blogs)
        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            try
            {
                var blogs = await _dbcontext.Blogs.ToListAsync(); // Asynchronously fetches blogs
                return Ok(blogs);  // Returns an HTTP 200 response with the list of blogs
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error occurred", Error = ex.Message }); // Returns an HTTP 500 if an error occurs
            }
        }

        //get blog by title
        [HttpGet("title")]
        public async Task<IActionResult> GetBlogByTitle([FromQuery] string title)
        {
            try
            {
                if (string.IsNullOrEmpty(title))
                {
                    return BadRequest(new { Message = "Title query parameter is required." });
                }
                var blog = await _dbcontext.Blogs
                    .Where(b => b.Title.ToLower().Contains(title.ToLower()))
                    .Include(b => b.Author)
                    .ToListAsync(); ;

                // Asynchronous operation

                var blog2 = _mapper.Map<List<GetBlogTitleDto>>(blog);

                if (blog == null)
                {
                    return NotFound(new { Message = "Blog not found" });
                }

                return Ok(blog2);
                // Returns an HTTP 200 with the blog data



            }
            catch (Exception ex)
            {
                // Log the exception if necessary
                return StatusCode(500, new { Message = "An error occurred while processing your request.", Error = ex.Message });
            }
        }





        //get blogs by id 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById([FromRoute] int id)
        {
            try
            {
                var blog = await _dbcontext.Blogs
                    .Where(b => b.Id == id)
                    .Include(b => b.Author)
                    .FirstOrDefaultAsync(); // Asynchronous method

                var blog2 = _mapper.Map<GetBlogTitleDto>(blog);

                if (blog == null)
                {
                    return NotFound(new { Message = "Blog not found" }); // Return NotFound with message
                }

                return Ok(blog2); // Return blog data with 200 OK
            }
            catch (Exception ex)
            {
                // Log the exception if necessary
                return StatusCode(500, new { Message = "An error occurred while processing your request.", Error = ex.Message });
            }
        }

        // Posting blogs
        [HttpPost]
        public async Task<IActionResult> AddBlog([FromBody] AddBlogDto addBlog)
        {
            try
            {
                //var blogEntity = new Blog()
                //{
                //    Title = addBlog.Title,
                //    Content = addBlog.Content,
                //    CreatedAt = DateTime.Now,
                //    AuthorId = addBlog.AuthorId
                //};

                var blogEntity = _mapper.Map<Blog>(addBlog);
                blogEntity.CreatedAt = DateTime.Now;

                await _dbcontext.Blogs.AddAsync(blogEntity);
                await _dbcontext.SaveChangesAsync();

                return Ok(blogEntity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while posting the blog.", Error = ex.Message });
            }
        }

        // Updating a particular blog
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] UpdateBlogDto updateBlog)
        {
            try
            {
                // Find the blog to update by id
                var blogToUpdate = _dbcontext.Blogs.FirstOrDefault(b => b.Id == id);


                if (blogToUpdate == null)
                {
                    return NotFound(new { Message = "Blog not found" });
                }

                blogToUpdate.Title = updateBlog.Title;
                blogToUpdate.Content = updateBlog.Content;
                
                // Save changes to the database
                await _dbcontext.SaveChangesAsync();

                return Ok(new { Message = "Blog updated successfully", Blog = blogToUpdate });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the blog.", Error = ex.Message });
            }
        }

        // Deleting a blog
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            try
            {
                var blogToDelete = await _dbcontext.Blogs.FirstOrDefaultAsync(b => b.Id == id);

                if (blogToDelete == null)
                {
                    return NotFound(new { Message = "Blog not found" });
                }

                _dbcontext.Blogs.Remove(blogToDelete);
                await _dbcontext.SaveChangesAsync();

                return Ok(new { Message = "Blog deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while deleting the blog.", Error = ex.Message });
            }
        }

        // Deleting all blogs
        [HttpDelete]
        public async Task<IActionResult> DeleteAllBlogs()
        {
            try
            {
                var blogs = await _dbcontext.Blogs.ToListAsync();

                if (!blogs.Any())
                {
                    return NotFound("No blogs found to delete");
                }

                _dbcontext.Blogs.RemoveRange(blogs);
                await _dbcontext.SaveChangesAsync();

                return Ok("All blogs deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while deleting all blogs.", Error = ex.Message });
            }
        }


    }
}
