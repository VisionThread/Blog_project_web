using System.Net;
using System.Reflection.Metadata;
using System.Xml.Linq;
using AutoMapper;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BlogApi2_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class BlogController : ControllerBase
    {
       
        private readonly IBlogReadService _blogReadService;
        private readonly IBlogWriteService _blogWriteService;
        private readonly IBlogDeleteService _blogDeleteService;
        private int GetStatusCodeFromException(Exception exp)
        {
            switch (exp)
            {
                case SqliteException _: return (int)HttpStatusCode.InternalServerError;
                case ArgumentException _: return (int)HttpStatusCode.BadRequest;
                case InvalidOperationException _: return (int)HttpStatusCode.BadRequest;
                case TimeoutException _: return (int)HttpStatusCode.RequestTimeout;
                default: return (int)HttpStatusCode.InternalServerError;
            }
        }

        public BlogController(IBlogReadService blogReadService, IBlogWriteService blogWriteService,IBlogDeleteService blogDeleteService)
            
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
            if(blogs == null)
            {
                return NotFound(new {Message ="No Blogs Found"});
            }

            return Ok(blogs);
        }

        //get blogs by id 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            try
            {
                var blog = await _blogReadService.GetBlogById(id);
                if (blog == null)
                {
                    return NotFound(new { Message = "No Blogs Found" });
                }
                var blogResponse = new
                {
                    blog.Id,
                    blog.Title,
                    blog.Content,
                    blog.CreatedAt,
                    blog.Author?.Name
                };
                return Ok(blogResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });

            }

        }

        // Creating blog
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody] AddBlogDto addBlog)
        {
            try
            {
              var blog = await _blogWriteService.CreateBlog(addBlog);
                return Ok(blog);
            }
            catch (Exception ex)
            {
                var statusCode = GetStatusCodeFromException(ex);
                return StatusCode(statusCode, new { message = "Error occurred", details = ex.Message });
            }
        }

        // Updating a particular blog
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] UpdateBlogDto updateBlog)
        {
            try
            {
                var blogToUpdate = await _blogWriteService.UpdateBlog(id, updateBlog);
                if(!blogToUpdate)
                {
                   return NotFound(new { Message = "Blog not found" });
                }

                return Ok(new { Message = "Blog updated successfully", Blog = blogToUpdate });
            }
            catch (Exception ex)
            {
                var statusCode = GetStatusCodeFromException(ex);
                return StatusCode(statusCode, new { message = "Error occurred", details = ex.Message });
            }
        }

        // Deleting a blog
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogById(int id)
        {
            try
            {
                var blogToDelete = await _blogDeleteService.DeleteBlogById(id);

                if (!blogToDelete)
                {
                    return NotFound(new { Message = "Blog not found" });
                }
                return Ok(new { Message = "Blog deleted successfully" });
            }
            catch (Exception ex)
            {
                var statusCode = GetStatusCodeFromException(ex);
                return StatusCode(statusCode, new { message = "Error occurred", details = ex.Message });
            }
        }

        // Deleting all blogs
        [HttpDelete]
        public async Task<IActionResult> DeleteAllBlogs()
        {
            try
            {
                var blogsToBeDeleted = await _blogDeleteService.DeleteAllBlogs();

                if (!blogsToBeDeleted)
                {
                    return NotFound("No blogs found to delete");
                }

                return Ok("All blogs deleted successfully");
            }
            catch (Exception ex)
            {
                var statusCode = GetStatusCodeFromException(ex);
                return StatusCode(statusCode, new { message = "Error occurred", details = ex.Message });
            }
        }


    }
}
