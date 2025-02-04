
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// function SearchBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch blogs by title when search query changes
//   const fetchBlogs = useCallback(async () => {
//     if (!searchQuery) {
//       setBlogs([]); // Clear blogs if no search query
//       return;
//     }

//     setLoading(true);
//     try {
//       const query = `?title=${encodeURIComponent(searchQuery)}`;
//       const response = await fetch(`http://localhost:5233/api/Blog/title${query}`);
//       if (!response.ok) {
//         throw new Error("Blog not found");
//       }
//       const data = await response.json();
//       setBlogs([data]); // Assuming response is a single blog object
//     } catch (error) {
//       setError(error.message);
//       setBlogs([]); // Clear any previous results if there's an error
//     } finally {
//       setLoading(false);
//     }
//   }, [searchQuery]);

//   useEffect(() => {
//     fetchBlogs();
//   }, [searchQuery, fetchBlogs]);

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Blogs</h1>

//       {/* Search Bar */}
//       <div className="mb-6 relative">
//         <input
//           type="text"
//           placeholder="Search blogs by title..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onClick={() => console.log("Input clicked")} // Action on click
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         {/* Optional clear button inside input */}
//         {searchQuery && (
//           <button
//             onClick={() => setSearchQuery('')}
//             className="absolute right-2 top-2 text-gray-500"
//           >
//             ✖
//           </button>
//         )}
//       </div>

//       {/* Loading State */}
//       {loading && <p>Loading...</p>}

//       {/* Error Handling */}
//       {error && !loading && <p className="text-red-600">{error}</p>}

//       {/* Display Blogs or No Blogs Found */}
//       <div className="space-y-4">
//         {blogs.length === 0 && !loading && !error ? (
//           <p>No blogs found. Try searching with different keywords.</p>
//         ) : (
//           blogs.map((blog) => (
//             <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
//               <h2 className="text-xl font-semibold">{blog.title}</h2>
//               <p className="text-gray-700 mt-2">{blog.content.substring(0, 100)}...</p>
//               <a
//                 href={`/blogs/${blog.id}`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate(`/blog/${blog.id}`);
//                 }}
//                 className="text-green-600 hover:underline mt-2 inline-block"
//               >
//                 Read more
//               </a>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchBlogs;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBlogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch the blog by title
  const fetchBlog = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a title.");
      setBlog(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5233/api/Blog/title?title=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Blog not found");

      const data = await response.json();
      setBlog(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setBlog(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Search Blog</h1>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter blog title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={fetchBlog}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Display Blog */}
      {blog && (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-700 mt-2">{blog.content.substring(0, 100)}...</p>
          <button
            onClick={() => navigate(`/blog/${blog.id}`)}
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

