using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi2_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthorController : ControllerBase
    {

        private readonly IAuthorService _authorService;
        private readonly IAuthorWriteService _authorWriteService;


        public AuthorController(IAuthorService authorService, IAuthorWriteService authorWriteService)
        {

            _authorService = authorService;
            _authorWriteService = authorWriteService;

        }

        // GET: api/Author (to fetch all the authors)
        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _authorService.GetAllAuthors();
            return Ok(authors);
        }

        // GET: api/Author/by-id/{id} (to fetch author by ID)
        [HttpGet("by-id/{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {

            var author = await _authorService.GetAuthorById(id);                                                                                                                               //Retrieves the first matching record(or null if none is found).

            if (author == null)
            {
                throw new KeyNotFoundException("Author not found");
            }

            return Ok(author);


        }

        // GET: api/Author/by-name (Get authors and their respective blogs based on their names)
        [HttpGet("by-name")]
        public async Task<IActionResult> GetAuthor([FromQuery] string name)
        {
            var author = await _authorService.GetAuthorByName(name);
            if (author == null)
            {
                throw new KeyNotFoundException("Author not found");
            }

            return Ok(author);


        }

        // POST: api/Author/login (for author login)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {

            if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest(new { Message = "Email and password are required." });
            }

            var author = await _authorWriteService.LoginAuthor(loginDto);
            if (author == null)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            return Ok(new { Message = "Login Successful", AuthorId = author.Id, Name = author.Name });

        }


        //register the new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AddAuthor addAuthor)
        {

            var newauthor = await _authorWriteService.RegisterAuthor(addAuthor);

            return CreatedAtAction(nameof(GetAuthors), new { id = newauthor.Id }, newauthor);


        }



        //author want to update their information 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] UpdateAuthorDto updateAuthorDto)
        {


            var updatedAuthor = await _authorWriteService.UpdateDetailAuthor(id, updateAuthorDto);

            return Ok(new { Message = "Author details updated successfully", Author = updatedAuthor });


        }

        //[HttpGet("trigger-error")]
        //public IActionResult TriggerError()
        //{
        //    throw new ArgumentNullException("This is a test exception");  // No try-catch here
        //}


    }

}
