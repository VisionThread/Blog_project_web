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

        public DbSet<Comments> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Explicitly configure the relationship between Blog and Author
            modelBuilder.Entity<Blog>()
                .HasOne(b => b.Author)
                .WithMany(a => a.Blogs)
                .HasForeignKey(b => b.AuthorId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
