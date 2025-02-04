


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogDetail from "../component/Blog"; // Import BlogDetail component

function AuthorSearch() {
  const [name, setName] = useState(""); // Input value
  const [authorData, setAuthorData] = useState(null); // Stores response data
  const [error, setError] = useState(null); // Stores error messages
  const [selectedBlog, setSelectedBlog] = useState(null); // Stores the selected blog for fullscreen view
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!name) {
      alert("Please enter an author's name.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5233/api/Author/by-name?name=${name}`);
      const data = await response.json(); // Parse the response JSON

      if (!response.ok) {
        throw new Error(data.message || "Author not found.");
      }

      setAuthorData(data);  // Set the correct structure (use authorName and blogs)
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--color-forest)] text-center">
        Search Author Blogs
      </h2>

      <div className="flex mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter author's name"
          className="border border-[var(--color-sage)] p-3 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition duration-200"
        />
        <button
          onClick={handleSearch}
          className="bg-[var(--color-forest)] text-white px-6 py-3 rounded-r-lg hover:bg-[var(--color-sage)] transition duration-200"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {selectedBlog ? (
        <BlogDetail
          blog={selectedBlog}
          authorName={authorData?.authorName}
          onBack={handleBackToList}
        />
      ) : (
        authorData && (
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-forest)]">{authorData.authorName}'s Blogs</h3>
            {/* Check if blogs exists and is an array */}
            {Array.isArray(authorData.blogs) && authorData.blogs.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {authorData.blogs.map((blog) => (
                  <li
                    key={blog.blogId}
                    className="border p-4 rounded-lg cursor-pointer hover:bg-[var(--color-sage)]"
                    onClick={() => handleBlogClick(blog.blogId)}
                  >
                    <h4 className="font-semibold text-[var(--color-forest)]">{blog.title}</h4>
                    <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No blogs found for this author.</p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default AuthorSearch;
