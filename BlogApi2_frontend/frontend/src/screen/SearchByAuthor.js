import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogDetail from "../component/Blog"; // Import BlogDetail component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SearchAuthor.css";
import authorService from "../services/authorService";

function AuthorSearch() {
  const [name, setName] = useState(""); // Input value
  const [authorData, setAuthorData] = useState(null); // Stores response data
  const [error, setError] = useState(null); // Stores error messages
  const [selectedBlog, setSelectedBlog] = useState(null); // Stores the selected blog for fullscreen view
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!name) {
      toast.warn("Please enter an author's name.");
      return;
    }

    try {
      const response = await authorService.getAuthorName(name);
      console.log(response);
      if (!response) {
        throw new Error(response.message || "Author not found.");
      }
      setAuthorData(response); // Set the correct structure (use authorName and blogs)
      setError(null);
      setSelectedBlog(null); // Reset selected blog on new search
    } catch (err) {
      setError(err.message);
      setAuthorData(null);
      setSelectedBlog(null);
    }
  };

  const handleBlogClick = (blogId) => {
    console.log("Selected Blog ID:", blogId);
    navigate(`/blog/${blogId}`); // Navigate to the blog detail page
  };

  const handleBackToList = () => {
    setSelectedBlog(null); // Go back to the list of blogs
  };

  return (
    <div className="search-author-container">
      <h2 className="search-author-title">Search Author Blogs</h2>

      <div className="search-author-bar">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter author's name"
          className="search-author-input"
        />
        <button onClick={handleSearch} className="search-author-btn">
          Search
        </button>
      </div>

      {error && <p className="search-author-error">{error}</p>}

      {selectedBlog ? (
        <BlogDetail
          blog={selectedBlog}
          authorName={authorData?.authorName}
          onBack={handleBackToList}
        />
      ) : (
        authorData && (
          <div>
            <h3 className="search-author-subtitle">
              {authorData.authorName}'s Blogs
            </h3>
            {/* Check if blogs exists and is an array */}
            {Array.isArray(authorData.blogs) && authorData.blogs.length > 0 ? (
              <ul className="blog-list">
                {authorData.blogs.map((blog) => (
                  <li
                    key={blog.blogId}
                    className="blog-item"
                    onClick={() => handleBlogClick(blog.blogId)}
                  >
                    <h4 className="blog-title">{blog.title}</h4>
                    <span className="blog-date">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-blogs">No blogs found for this author.</p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default AuthorSearch;
