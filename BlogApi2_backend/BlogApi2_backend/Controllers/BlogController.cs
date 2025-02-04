using System.Reflection.Metadata;
using System.Xml.Linq;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogContext _dbcontext;

        public BlogController(BlogContext dbcontext)
        {
            _dbcontext = dbcontext;
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
                    .Where(b => b.Title.ToLower() == title.ToLower())
                    .Select(b => new
                    {
                        b.Id,
                        b.Title,
                        b.Content,
                        b.CreatedAt,
                        AuthorName = b.Author.Name // Assuming Author class has a Name property
                    })
                    .FirstOrDefaultAsync(); // Asynchronous operation

                if (blog == null)
                {
                    return NotFound(new { Message = "Blog not found" });
                }

                return Ok(blog); // Returns an HTTP 200 with the blog data
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
                    .Select(b => new
                    {
                        b.Id,
                        b.Title,
                        b.Content,
                        b.CreatedAt,
                        AuthorName = b.Author.Name // Assuming Author class has a Name property
                    })
                    .FirstOrDefaultAsync(); // Asynchronous method

                if (blog == null)
                {
                    return NotFound(new { Message = "Blog not found" }); // Return NotFound with message
                }

                return Ok(blog); // Return blog data with 200 OK
            }
            catch (Exception ex)
            {
                // Log the exception if necessary
                return StatusCode(500, new { Message = "An error occurred while processing your request.", Error = ex.Message });
            }
        }

        ////posting blogs 
        //[HttpPost]
        //public IActionResult AddBlog(AddBlogDto addBlog)
        //{
        //    var BlogEntity = new Blog()
        //    { 
        //        Title = addBlog.Title,
        //        Content = addBlog.Content,
        //        CreatedAt = DateTime.Now,
        //        AuthorId = addBlog.AuthorId
        //    };

        //    _dbcontext.Blogs.Add(BlogEntity);
        //    _dbcontext.SaveChanges();

        //    return Ok(BlogEntity);
        //}



        ////updating the particular blog 
        //[HttpPut("{id:int}")]
        //public IActionResult UpdateBlog(int id, [FromBody] UpdateBlogDto updateBlog)
        //{
        //    // Find the blog to update by its ID
        //    var blogToUpdate = _dbcontext.Blogs.FirstOrDefault(b => b.Id == id);

        //    if (blogToUpdate == null)
        //    {
        //        return NotFound(new { Message = "Blog not found" });
        //    }

        //    // Update the blog's title and content with the new values
        //    blogToUpdate.Title = updateBlog.Title;
        //    blogToUpdate.Content = updateBlog.Content;

        //    // Save the changes to the database
        //    _dbcontext.SaveChanges();

        //    // Return a success message with the updated blog data
        //    return Ok(new { Message = "Blog updated successfully", Blog = blogToUpdate });
        //}





        ////delete the blog
        //[HttpDelete("{id}")]
        //public IActionResult DeleteBlog(int id)
        //{
        //    var blogToDelete = _dbcontext.Blogs.FirstOrDefault(b => b.Id == id);

        //    if (blogToDelete == null)
        //    {
        //        return NotFound(new { Message = "Blog not found" });
        //    }

        //    _dbcontext.Blogs.Remove(blogToDelete);
        //    _dbcontext.SaveChanges();

        //    return Ok(new { Message = "Blog deleted successfully" });
        //}

        ////to delete all the blogs
        //// Delete all blogs
        //[HttpDelete]
        //public IActionResult DeleteAllBlogs()
        //{
        //    // Retrieve all blogs
        //    var blogs = _dbcontext.Blogs.ToList();

        //    // If there are no blogs, return a response indicating nothing to delete
        //    if (!blogs.Any())
        //    {
        //        return NotFound("No blogs found to delete");
        //    }

        //    // Remove all blogs from the database
        //    _dbcontext.Blogs.RemoveRange(blogs);
        //    _dbcontext.SaveChanges();

        //    return Ok("All blogs deleted successfully");
        //}


        // Posting blogs
        [HttpPost]
        public async Task<IActionResult> AddBlog([FromBody] AddBlogDto addBlog)
        {
            try
            {
                var blogEntity = new Blog()
                {
                    Title = addBlog.Title,
                    Content = addBlog.Content,
                    CreatedAt = DateTime.Now,
                    AuthorId = addBlog.AuthorId
                };

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
                var blogToUpdate = await _dbcontext.Blogs.FirstOrDefaultAsync(b => b.Id == id);

                if (blogToUpdate == null)
                {
                    return NotFound(new { Message = "Blog not found" });
                }

                // Update the blog's title and content
                blogToUpdate.Title = updateBlog.Title;
                blogToUpdate.Content = updateBlog.Content;

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
