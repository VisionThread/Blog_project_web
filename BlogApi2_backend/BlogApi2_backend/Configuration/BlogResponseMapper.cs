using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Configuration
{
    public static class BlogResponseMapper
    {
        public static object MapToResponse(Blog blog)
        {
            return new
            {
                blog.Id,
                blog.Title,
                blog.Content,
                blog.CreatedAt,
                AuthorName = blog.Author != null ? blog.Author.Name : string.Empty
            };
        }
    }
}
