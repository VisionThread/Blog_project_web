import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SearchBlog.css";
import BlogService from "../services/blogService";

function SearchBlogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setBlogs([]);
      setShowSuggestions(false);
      return;
    }

    // Function to fetch the blog by title
    const fetchBlog = async () => {
      try {
        const response = await BlogService.searchBlogByTitle(searchQuery);
        if (!response) throw new Error("No blogs found");
        setBlogs(response);
        setShowSuggestions(true);
        setError(null);
      } catch (error) {
        setError(error.message);
        setBlogs([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimeout = setTimeout(fetchBlog, 300); // Debounce to wait 300ms before triggering the fetch

    return () => clearTimeout(debounceTimeout); // Cleanup timeout on change
  }, [searchQuery]);

  return (
    <div className="overall-container">
      <h1 className="overall-title">Search Blog</h1>

      {/* Search Bar */}
      <div className="search-blog-container">
        <input
          type="text"
          placeholder="Enter blog title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input-field"
        />
        {/* Autocomplete Suggestions */}
        {showSuggestions && blogs.length > 0 && (
          <ul className="autocomplete-suggestions">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="suggestion-item"
                onClick={() => {
                  navigate(`/blog/${blog.id}`);
                  setSearchQuery(blog.title); // Set the input to selected blog title
                  setShowSuggestions(false); // Hide suggestions
                }}
              >
                {blog.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Blog */}
      {blogs.length === 1 && (
        <div className="blog-card">
          <h2 className="blog-title">{blogs[0].title}</h2>
          <p className="blog-content">
            {blogs[0].content.substring(0, 100)}...
          </p>
          <button
            onClick={() => navigate(`/blog/${blogs[0].id}`)}
            className="read-more-btn"
          >
            Read more
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBlogs;
