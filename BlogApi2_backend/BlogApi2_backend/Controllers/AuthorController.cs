using System.Text.Json;
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
    public class AuthorController : ControllerBase
    {
        private readonly BlogContext dbcontext;

        public AuthorController(BlogContext dbcontext)
        { 
            this.dbcontext = dbcontext;
        }
        // GET: api/Author(to fetch all the authors)
        [HttpGet]
        public IActionResult GetBlogs()
        {
            var authors = dbcontext.Authors.ToList();

            return Ok(authors);

        }

        [HttpGet("by-id/{id:int}")]
        public IActionResult GetAuthorById(int id)
        {
            var author = dbcontext.Authors.Where(a => a.Id == id)
                .Select(a => new
                {
                    AuthorId = a.Id,
                    AuthorName = a.Name,
                    Blogs = dbcontext.Blogs
                        .Where(b => b.AuthorId == a.Id)
                        .Select(b => new
                        {
                            BlogId = b.Id,
                            Title = b.Title,
                            Content = b.Content,
                            CreatedAt = b.CreatedAt
                        }).ToList()
                }).FirstOrDefault();

            if (author == null)
            {
                return NotFound(new { Message = "Author not found" });
            }

            return Ok(author);
        }



        //Get authors and their respective blogs based on their names
        [HttpGet("by-name")]
        public IActionResult GetAuthor([FromQuery] string name)
        {
           var author = dbcontext.Authors.Where(a => a.Name.ToLower() == name.ToLower()).Select(a => new
           {
               AuthorId=a.Id,
               AuthorName = a.Name,
               Blogs = dbcontext.Blogs
                .Where(b => b.AuthorId == a.Id)
                .Select(b => new
                {
                    BlogId = b.Id,
                    Title = b.Title,
                    Content = b.Content,
                    CreatedAt = b.CreatedAt
                }).ToList()
           }).FirstOrDefault();



            if (author == null)
            {
                return NotFound(new { Message = "Author not found" });
            }

            return Ok(author);
        }

        //[HttpPost]
        //public IActionResult AddAuthor(AddAuthor addAuthor)
        //{
        //    // Create a new Author entity from the AddAuthor DTO
        //    var authorEntity = new Author()
        //    {
        //        Name = addAuthor.Name,
        //        Email = addAuthor.Email,
        //        Password = addAuthor.Password
        //    };

        //    // Add the new Author entity to the database
        //    dbcontext.Authors.Add(authorEntity);
        //    dbcontext.SaveChanges();

        //    // Return the newly created author as a response
        //    return CreatedAtAction(nameof(GetBlogs), new { id = authorEntity.Id }, authorEntity);
        //}

        //login of all the authors 
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest(new { Message = "Email and password are required." });
            }

            var author = dbcontext.Authors.FirstOrDefault(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

            if (author == null)
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }

            return Ok(new { Message = "Login Successful", AuthorId = author.Id, Name = author.Name });
        }

        [HttpPost("register")]
        public IActionResult Register(AddAuthor addAuthor)
        {
            // Check if the email is already in use
            var existingAuthor = dbcontext.Authors.FirstOrDefault(a => a.Email == addAuthor.Email);
            if (existingAuthor != null)
            {
                return BadRequest(new { Message = "Email is already registered" });
            }

            // Create a new Author entity from the AddAuthor DTO
            var authorEntity = new Author()
            {
                Name = addAuthor.Name,
                Email = addAuthor.Email,
                Password = addAuthor.Password // You should hash the password before saving in a real-world application
            };

            // Add the new Author entity to the database
            dbcontext.Authors.Add(authorEntity);
            dbcontext.SaveChanges();

            // Return the newly created author as a response
            return CreatedAtAction(nameof(GetBlogs), new { id = authorEntity.Id }, authorEntity);
        }
        //author want to update their information 
        [HttpPut("{id}")]
        public IActionResult UpdateAuthor(int id, [FromBody] UpdateAuthorDto updateAuthorDto)
        {
            // Find the author by id
            var author = dbcontext.Authors.FirstOrDefault(a => a.Id == id);

            // Check if the author exists
            if (author == null)
            {
                return NotFound(new { Message = "Author not found" });
            }

            // Update the author's details
            author.Name = updateAuthorDto.Name ?? author.Name;
            author.Email = updateAuthorDto.Email ?? author.Email;

            // Only update the password if it's provided (and you should hash it in real-world cases)
            if (!string.IsNullOrEmpty(updateAuthorDto.Password))
            {
                author.Password = updateAuthorDto.Password; // Make sure to hash the password before saving!
            }

            // Save the changes to the database
            dbcontext.SaveChanges();

            // Return the updated author
            return Ok(new { Message = "Author details updated successfully", Author = author });
        }


    }



}
