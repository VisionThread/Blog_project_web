
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch(
          `http://localhost:5233/api/Blog/title?title=${encodeURIComponent(searchQuery)}`
        );

        if (!response.ok) throw new Error("No blogs found");

        const data = await response.json();
        setBlogs(data);
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
    <div className="max-w-3xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Search Blog</h1>
  
    {/* Search Bar */}
    <div className="relative flex flex-col items-start space-x-2 mb-6">
      <input
        type="text"
        placeholder="Enter blog title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
      />
  
      {/* Autocomplete Suggestions */}
      {showSuggestions && blogs.length > 0 && (
        <ul className="absolute transform -translate-x-2 w-full bg-white border border-gray-300 rounded-md mt-12 shadow-md max-h-60 overflow-y-auto z-10">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
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
    {error && <p className="text-red-600">{error}</p>}
  
    {/* Display Blog */}
    {blogs.length === 1 && (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{blogs[0].title}</h2>
        <p className="text-gray-700 mt-2">{blogs[0].content.substring(0, 100)}...</p>
        <button
          onClick={() => navigate(`/blog/${blogs[0].id}`)}
          className="mt-2 text-green-600 hover:underline"
        >
          Read more
        </button>
      </div>
    )}
  </div>
  );
 
}

export default SearchBlogs;

