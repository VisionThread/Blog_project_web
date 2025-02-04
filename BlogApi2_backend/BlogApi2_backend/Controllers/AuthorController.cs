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
        //// GET: api/Author(to fetch all the authors)
        //[HttpGet]
        //public IActionResult GetBlogs()
        //{
        //    var authors = dbcontext.Authors.ToList();

        //    return Ok(authors);

        //}

        //[HttpGet("by-id/{id}")]
        //public IActionResult GetAuthorById(int id)
        //{
        //    var author = dbcontext.Authors.Where(a => a.Id == id)
        //        .Select(a => new
        //        {
        //            AuthorId = a.Id,
        //            AuthorName = a.Name,
        //            Blogs = dbcontext.Blogs
        //                .Where(b => b.AuthorId == a.Id)
        //                .Select(b => new
        //                {
        //                    BlogId = b.Id,
        //                    Title = b.Title,
        //                    Content = b.Content,
        //                    CreatedAt = b.CreatedAt
        //                }).ToList()
        //        }).FirstOrDefault();

        //    if (author == null)
        //    {
        //        return NotFound(new { Message = "Author not found" });
        //    }

        //    return Ok(author);
        //}



        ////Get authors and their respective blogs based on their names
        //[HttpGet("by-name")]
        //public IActionResult GetAuthor([FromQuery] string name)
        //{
        //   var author = dbcontext.Authors.Where(a => a.Name.ToLower() == name.ToLower()).Select(a => new
        //   {
        //       AuthorId=a.Id,
        //       AuthorName = a.Name,
        //       Blogs = dbcontext.Blogs
        //        .Where(b => b.AuthorId == a.Id)
        //        .Select(b => new
        //        {
        //            BlogId = b.Id,
        //            Title = b.Title,
        //            Content = b.Content,
        //            CreatedAt = b.CreatedAt
        //        }).ToList()
        //   }).FirstOrDefault();



        //    if (author == null)
        //    {
        //        return NotFound(new { Message = "Author not found" });
        //    }

        //    return Ok(author);
        //}


        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginDto loginDto)
        //{
        //    if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
        //    {
        //        return BadRequest(new { Message = "Email and password are required." });
        //    }

        //    var author = dbcontext.Authors.FirstOrDefault(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

        //    if (author == null)
        //    {
        //        return Unauthorized(new { Message = "Invalid credentials" });
        //    }

        //    return Ok(new { Message = "Login Successful", AuthorId = author.Id, Name = author.Name });
        //}


        // GET: api/Author (to fetch all the authors)
        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            try
            {
                var authors = await dbcontext.Authors.ToListAsync();

                return Ok(authors);
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status code with error message
                return StatusCode(500, new { Message = "An error occurred while fetching authors.", Error = ex.Message });
            }
        }

        // GET: api/Author/by-id/{id} (to fetch author by ID)
        [HttpGet("by-id/{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {
            try
            {
                var author = await dbcontext.Authors
                    .Where(a => a.Id == id)
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
                            })
                            .ToList()
                    })
                    .FirstOrDefaultAsync();

                if (author == null)
                {
                    return NotFound(new { Message = "Author not found" });
                }

                return Ok(author);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching the author.", Error = ex.Message });
            }
        }

        // GET: api/Author/by-name (Get authors and their respective blogs based on their names)
        [HttpGet("by-name")]
        public async Task<IActionResult> GetAuthor([FromQuery] string name)
        {
            try
            {
                var author = await dbcontext.Authors
                    .Where(a => a.Name.ToLower() == name.ToLower())
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
                            })
                            .ToList()
                    })
                    .FirstOrDefaultAsync();

                if (author == null)
                {
                    return NotFound(new { Message = "Author not found" });
                }

                return Ok(author);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching the author by name.", Error = ex.Message });
            }
        }

        // POST: api/Author/login (for author login)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
                {
                    return BadRequest(new { Message = "Email and password are required." });
                }

                var author = await dbcontext.Authors
                    .FirstOrDefaultAsync(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

                if (author == null)
                {
                    return Unauthorized(new { Message = "Invalid credentials" });
                }

                return Ok(new { Message = "Login Successful", AuthorId = author.Id, Name = author.Name });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during login.", Error = ex.Message });
            }
        }


        //register the new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AddAuthor addAuthor)
        {
            try
            {
                // Check if the email is already in use asynchronously
                var existingAuthor = await dbcontext.Authors
                    .FirstOrDefaultAsync(a => a.Email == addAuthor.Email);

                if (existingAuthor != null)
                {
                    return BadRequest(new { Message = "Email is already registered" });
                }

                // Create a new Author entity from the AddAuthor DTO
                var authorEntity = new Author()
                {
                    Name = addAuthor.Name,
                    Email = addAuthor.Email,
                    Password = addAuthor.Password // Ideally, you should hash the password here!
                };

                // Add the new Author entity to the database asynchronously
                await dbcontext.Authors.AddAsync(authorEntity);
                await dbcontext.SaveChangesAsync();

                // Return the newly created author as a response
                return CreatedAtAction(nameof(GetBlogs), new { id = authorEntity.Id }, authorEntity);
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status code with error message
                return StatusCode(500, new { Message = "An error occurred while registering the author.", Error = ex.Message });
            }
        }



        //author want to update their information 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] UpdateAuthorDto updateAuthorDto)
        {
            try
            {
                // Find the author by id asynchronously
                var author = await dbcontext.Authors.FirstOrDefaultAsync(a => a.Id == id);

                // Check if the author exists
                if (author == null)
                {
                    return NotFound(new { Message = "Author not found" });
                }

                // Update the author's details if new values are provided
                author.Name = updateAuthorDto.Name ?? author.Name;
                author.Email = updateAuthorDto.Email ?? author.Email;

                // Only update the password if provided (hash the password in real-world applications)
                if (!string.IsNullOrEmpty(updateAuthorDto.Password))
                {
                    author.Password = updateAuthorDto.Password; // Ideally, hash the password here!
                }

                // Save the changes asynchronously
                await dbcontext.SaveChangesAsync();

                // Return the updated author details
                return Ok(new { Message = "Author details updated successfully", Author = author });
            }
            catch (Exception ex)
            {
                // Log the exception and return 500 status code with error message
                return StatusCode(500, new { Message = "An error occurred while updating the author.", Error = ex.Message });
            }
        }



    }



}
