using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlogApi2_backend.Migrations
{
    /// <inheritdoc />
    public partial class Commentupdatd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Comments",
                newName: "CommentText");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CommentText",
                table: "Comments",
                newName: "Content");
        }
    }
}
