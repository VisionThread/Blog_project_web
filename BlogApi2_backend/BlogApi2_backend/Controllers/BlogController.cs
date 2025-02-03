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
        public IActionResult GetBlogs()
        {
            var blogs = _dbcontext.Blogs.ToList();

            return Ok(blogs);
        }
        //get blogs by id 
        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBlogById(int id)
        {
            //var b= _dbcontext.Blogs.Find(id);
            // if(b==null)
            // {
            //     return NotFound();
            // }

            // return Ok(b);

            var blog = _dbcontext.Blogs
                        .Where(b => b.Id == id)
                        .Select(b => new
                        {
                            b.Id,
                            b.Title,
                            b.Content,
                            b.CreatedAt,
                            AuthorName = b.Author.Name // Assuming Author class has a Name property
                        })
                        .FirstOrDefault();

            if (blog == null)
            {
                return NotFound();
            }

            return Ok(blog);
        }
        //posting blogs 
        [HttpPost]
        public IActionResult AddBlog(AddBlogDto addBlog)
        {
            var BlogEntity = new Blog()
            { 
                Title = addBlog.Title,
                Content = addBlog.Content,
                CreatedAt = DateTime.Now,
                AuthorId = addBlog.AuthorId
            };

            _dbcontext.Blogs.Add(BlogEntity);
            _dbcontext.SaveChanges();

            return Ok(BlogEntity);
        }

        //[HttpPost]
        //public IActionResult AddBlog(AddBlogDto addBlog)
        //{
        //    // Find the author by AuthorId
        //    var author = _dbcontext.Authors.FirstOrDefault(a => a.Id == addBlog.AuthorId);
        //    if (author == null)
        //    {
        //        return NotFound("Author not found");
        //    }

        //    // Create the new blog entity
        //    var blogEntity = new Blog()
        //    {
        //        Title = addBlog.Title,
        //        Content = addBlog.Content,
        //        CreatedAt = DateTime.Now,
        //        AuthorId = addBlog.AuthorId,
        //        Author = author // Set the Author navigation property
        //    };

        //    // Add the blog to the database
        //    _dbcontext.Blogs.Add(blogEntity);

        //    // Add the blog to the author's Blogs list
        //    author.Blogs.Add(blogEntity);

        //    // Save changes to the database
        //    _dbcontext.SaveChanges();

        //    // Get updated list of blogs for the author, including Author information
        //    var updatedAuthorBlogs = _dbcontext.Blogs
        //        .Where(b => b.AuthorId == addBlog.AuthorId)
        //        .ToList();

        //    // Return the updated list of blogs for the author
        //    return Ok(updatedAuthorBlogs);
        //}


        //updating the particular blog 
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateBlog(int id,UpdateBlogDto updateBlog)
        {
            var existingBlog = _dbcontext.Blogs.FirstOrDefault(b => b.Id == id);

            if (existingBlog == null)
            {
                return NotFound(new { Message = "Blog not found" });
            }

            existingBlog.Title = updateBlog.Title;
            existingBlog.Content = updateBlog.Content;
            existingBlog.CreatedAt = DateTime.Now; // or retain original, depending on your logic
            existingBlog.AuthorId = updateBlog.AuthorId;

            _dbcontext.SaveChanges();
            return Ok(existingBlog);
        }

        //delete the blog
        [HttpDelete("{id}")]
        public IActionResult DeleteBlog(int id)
        {
            var blogToDelete = _dbcontext.Blogs.FirstOrDefault(b => b.Id == id);

            if (blogToDelete == null)
            {
                return NotFound(new { Message = "Blog not found" });
            }

            _dbcontext.Blogs.Remove(blogToDelete);
            _dbcontext.SaveChanges();

            return Ok(new { Message = "Blog deleted successfully" });
        }

        //to delete all the blogs
        // Delete all blogs
        [HttpDelete]
        public IActionResult DeleteAllBlogs()
        {
            // Retrieve all blogs
            var blogs = _dbcontext.Blogs.ToList();

            // If there are no blogs, return a response indicating nothing to delete
            if (!blogs.Any())
            {
                return NotFound("No blogs found to delete");
            }

            // Remove all blogs from the database
            _dbcontext.Blogs.RemoveRange(blogs);
            _dbcontext.SaveChanges();

            return Ok("All blogs deleted successfully");
        }

    }
}
