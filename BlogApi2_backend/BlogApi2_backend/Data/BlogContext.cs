using BlogApi2_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlogApi2_backend.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Author> Authors { get; set; }
    }
}
