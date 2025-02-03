

// import React, { useState } from "react";

// function AuthorSearch() {
//   const [name, setName] = useState(""); // Input value
//   const [authorData, setAuthorData] = useState(null); // Stores response data
//   const [error, setError] = useState(null); // Stores error messages

//   const handleSearch = async () => {
//     if (!name) {
//       alert("Please enter an author's name.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5233/api/Author/by-name?name=${name}`);
//       console.log(response);
//       const data = await response.json();
//       console.log(data); // Parse the response JSON

//       if (!response.ok) {
//         throw new Error(data.message || "Author not found.");
//       }

//       setAuthorData(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       setAuthorData(null);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">Search Author Blogs</h2>
      
//       <div className="flex mb-4">
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter author's name"
//           className="border border-gray-300 p-2 rounded w-full"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {authorData && (
//         <div>
//           <h3 className="text-lg font-bold">{authorData.authorName}'s Blogs</h3>
//           {/* Check if Blogs exists and is an array */}
//           {Array.isArray(authorData.blogs) && authorData.blogs.length > 0 ? (
//             <ul className="mt-2 space-y-3">
//               {authorData.blogs.map((blog) => (
//                 <li key={blog.BlogId} className="border p-3 rounded">
//                   <h4 className="font-semibold">{blog.title}</h4>
//                   <p>{blog.content}</p>
//                   <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No blogs found for this author.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AuthorSearch;




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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Search Author Blogs</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter author's name"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {selectedBlog ? (
        <BlogDetail
          blog={selectedBlog}
          authorName={authorData?.authorName}
          onBack={handleBackToList}
        />
      ) : (
        authorData && (
          <div>
            <h3 className="text-lg font-bold">{authorData.authorName}'s Blogs</h3>
            {/* Check if blogs exists and is an array */}
            {Array.isArray(authorData.blogs) && authorData.blogs.length > 0 ? (
              <ul className="mt-2 space-y-3">
                {authorData.blogs.map((blog) => (
                  <li
                    key={blog.blogId}
                    className="border p-3 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleBlogClick(blog.blogId)}
                  >
                    <h4 className="font-semibold">{blog.title}</h4>
                    <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No blogs found for this author.</p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default AuthorSearch;
