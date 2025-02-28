using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using BlogApi2_backend.Data;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
       
        private readonly IAuthorService _authorService;
        private readonly IAuthorWriteService _authorWriteService;

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

        public AuthorController(IAuthorService authorService,IAuthorWriteService authorWriteService)
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
            try
            {
                var author = await _authorService.GetAuthorById(id);                                                                                                                               //Retrieves the first matching record(or null if none is found).

                if (author == null)
                {
                    return NotFound(new { Message = "Author not found" });
                }

                return Ok(author);
            }
            catch (Exception ex)
            {
                var statusCode = GetStatusCodeFromException(ex);
                return StatusCode(statusCode, new { message = "Error occurred", details = ex.Message });
            }
        }

                                                                                                                                                                                             // GET: api/Author/by-name (Get authors and their respective blogs based on their names)
        [HttpGet("by-name")]
        public async Task<IActionResult> GetAuthor([FromQuery] string name)
        {
            try
            {
                var author = await _authorService.GetAuthorByName(name);    
                if (author == null)
                {
                    return NotFound(new { Message = "Author not found" });
                }

                return Ok(author);
            }
            catch (Exception ex)
            {
                var statusCode = GetStatusCodeFromException(ex);
                return StatusCode(statusCode, new { message = "Error occurred", details = ex.Message });
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

                var author = await _authorWriteService.LoginAuthor(loginDto);   
                if (author == null)
                {
                    return Unauthorized(new { Message = "Invalid credentials" });
                }

                return Ok(new { Message = "Login Successful", AuthorId = author.Id, Name = author.Name });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = "Invalid credentials" + ex.Message });
            }
        }


        //register the new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AddAuthor addAuthor)
        {
            try
            {
                var newauthor = await _authorWriteService.RegisterAuthor(addAuthor);

                return CreatedAtAction(nameof(GetAuthors), new { id = newauthor.Id }, newauthor);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        //author want to update their information 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] UpdateAuthorDto updateAuthorDto)
        {
            try
            {
                                                                                                                         
               var updatedAuthor = await _authorWriteService.UpdateDetailAuthor(id, updateAuthorDto);
                                                                                                                                         
                return Ok(new { Message = "Author details updated successfully", Author = updatedAuthor });
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

    }

}
