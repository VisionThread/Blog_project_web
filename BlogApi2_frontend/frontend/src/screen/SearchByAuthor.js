import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SearchAuthor.css";
import authorService from "../services/authorService";

function AuthorSearch() {
  const [name, setName] = useState(""); 
  const [authorData, setAuthorData] = useState(null); 
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  //handling search
  const handleSearch = async () => {
    if (!name) {
      toast.warn("Please enter an author's name.");
      return;
    }

    try {
      const response = await authorService.getAuthorName(name);
      //console.log(response); // Log the response for debugging
      const matchedAuthor = response.find(
        (author) => author.authorName.toLowerCase() === name.toLowerCase()
      )
      if(matchedAuthor){
        setAuthorData(matchedAuthor); 
      }
      else{
        toast.warn("No author found with the given name.");
        setAuthorData(null);
      }
      
    } catch (err) {
      //toast.error(err.message);
      setAuthorData(null);
    }
  };

  //handling blog click
  const handleBlogClick = (blogId) => {
    console.log("Selected Blog ID:", blogId);
    navigate(`/blog/${blogId}`); // Navigate to the blog detail page
  };

  //handling input change
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setName(value);
    if(value.length > 1) {
      try {
        const response = await authorService.getAuthorName(value); // Fetch suggestions
        const filteredSuggestions = response.filter((author) =>
          author.authorName.toLowerCase().includes(value.toLowerCase())
        ); // Filter authors based on input
        setSuggestions(filteredSuggestions); 
      } catch (err) {
        setSuggestions([]);
      }
    }
    else
    {
      setSuggestions([]);
    } 
  }

  //handling suggestion click
  const handleSuggestionClick = (suggestion) => {
    setName(suggestion.authorName); // Set the input value to the clicked suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="search-author-container">
      <h2 className="search-author-title">Search Author Blogs</h2>

      <div className="search-author-bar">
        <input
          type="text"
          value={name}
          // onChange={(e) => setName(e.target.value)}
          onChange={handleInputChange}
          placeholder="Enter author's name"
          className="search-author-input"
        />
        <button onClick={handleSearch} className="search-author-btn">
          Search
        </button>
        {suggestions.length > 0 && 
        (
          <ul className="autocomplete-suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                >
                {suggestion.authorName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {authorData && (
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
      )}
    </div>
  );
}

export default AuthorSearch;
