using AutoMapper;
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
    public class CommentController : ControllerBase
    {
        private readonly BlogContext dbcontext;
        private readonly IMapper _mapper;

        public CommentController(BlogContext dbcontext,IMapper mapper)
        {
            this.dbcontext = dbcontext;
            this._mapper = mapper;
        }


        [HttpGet("blog/{blogId}")]
        public async Task<IActionResult> GetCommentsForBlog(int blogId)
        {
            
            var blog = await dbcontext.Blogs
                                .Where(b => b.Id == blogId)
                                .Select(b => new
                                {
                                    b.Id,
                                    b.Title,
                                    Comments = b.Comments.Select(c => new
                                    {
                                        c.Id,
                                        c.CommentText,
                                        AuthorName = dbcontext.Authors
                                            .Where(a => a.Id == c.AuthorId)
                                            .Select(a => a.Name)
                                            .FirstOrDefault(), // Fetch Author Name
                                        c.CreatedAt
                                    }).ToList()
                                })
                                .FirstOrDefaultAsync();
            if (blog == null)
            {
                return NotFound();
            }

            return Ok(blog.Comments);
        }

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddComment addCommentDto)
        {
            if (addCommentDto == null)
            {
                return BadRequest("Comment data is required.");
            }

            var blog1 = await dbcontext.Blogs.FindAsync(addCommentDto.BlogId);
            if (blog1 == null)
            {
                return BadRequest("Invalid BlogId. The blog does not exist.");
            }


            // Validate AuthorId (if needed)
            var author = await dbcontext.Authors.FindAsync(addCommentDto.AuthorId);
            if (author == null)
                return BadRequest("Invalid AuthorId. The author does not exist.");

            var comment = _mapper.Map<Comments>(addCommentDto);

            

            dbcontext.Comments.Add(comment);
            await dbcontext.SaveChangesAsync();

            // Return the created comment with HTTP 201 status
            return CreatedAtAction(nameof(GetCommentById), new { id = comment.Id }, comment);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Comments>> GetCommentById(int id)
        {
            var comment = await dbcontext.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return comment;
        }


    }
}
