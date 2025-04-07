using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlogApi2_backend.Controllers;
using BlogApi2_backend.Models.Entities;
using BlogApi2_backend.Services.IServices;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi2_backend.Tests.Controller
{
    public class BlogControllerTests
    {
      
        private readonly IBlogReadService _blogReadService;
        private readonly IBlogWriteService _blogWriteService;
        private readonly IBlogDeleteService _blogDeleteService;
        private readonly BlogController _controller;

        public BlogControllerTests()
        {
            
            _blogReadService = A.Fake<IBlogReadService>();
            _blogWriteService = A.Fake<IBlogWriteService>();
            _blogDeleteService = A.Fake<IBlogDeleteService>();
            _controller = new BlogController(_blogReadService, _blogWriteService, _blogDeleteService);
        }

        [Fact]
        public async Task GetBlogs_ReturnsOkResult_ListOfBlogs()
        {
            // Arrange
            var blogs = new List<Blog> { new Blog { Id = 1, Title = "Test Blog", Content = "Test Content" } };
            A.CallTo(() => _blogReadService.GetBlogs()).Returns(Task.FromResult((IEnumerable<Blog>)blogs));

            // Act
            var result = await _controller.GetBlogs();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<Blog>>(okResult.Value);
            Assert.Single(returnValue);
        }
    }
}
