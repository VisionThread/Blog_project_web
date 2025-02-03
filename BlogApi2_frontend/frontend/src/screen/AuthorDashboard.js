// // import React, { useState, useEffect, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuthor } from "../context/AuthorContext";

// // function AuthorDashboard() {
// //   const [blogs, setBlogs] = useState([]);
// //   const navigate = useNavigate();
// //   const { authorId } = useAuthor(); // Replace this with actual author ID from authentication.

// //   useEffect(() => {
// //     if (authorId) {
// //       fetchAuthorBlogs(authorId); // Fetch blogs when authorId is available
// //     }
// //   }, [authorId]);

// //   // Fetch blogs by the author
// //   async function fetchAuthorBlogs(id) {
// //     try {
// //       const response = await fetch(`http://localhost:5233/api/Author/by-id/${id}`);
// //      console.log(response);
// //       // Check if the response is successful
// //       if (!response.ok) {
// //         throw new Error('Author not found');
// //       }

// //       // Check if the response body contains any data
// //       const data = await response.json(); // Directly parse JSON
// //       console.log(data);
// //       setBlogs(data?.Blogs || []); // Update blogs state
// //     } catch (error) {
// //       console.error('Error fetching blogs:', error.message);
// //     }
// //   }

// //   // Handle blog deletion
// //   const handleDelete = async (blogId) => {
// //     if (window.confirm("Are you sure you want to delete this blog?")) {
// //       try {
// //         const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
// //           method: "DELETE",
// //         });

// //         if (response.ok) {
// //           setBlogs(blogs.filter((blog) => blog.id !== blogId)); // Remove deleted blog from state
// //         } else {
// //           console.error('Failed to delete blog');
// //         }
// //       } catch (error) {
// //         console.error("Error deleting blog:", error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
// //       <h1 className="text-3xl font-bold mb-6 text-[var(--color-forest)]">Your Blogs</h1>

// //       {blogs.length === 0 ? (
// //         <p className="text-gray-600">No blogs found. Start writing now!</p>
// //       ) : (
// //         <ul>
// //           {blogs.map((blog) => (
// //             <li key={blog.id} className="border-b py-4">
// //               <h2 className="text-xl font-semibold">{blog.title}</h2>
// //               <p className="text-gray-700">{blog.content.slice(0, 100)}...</p>

// //               <div className="mt-2">
// //                 <button
// //                   onClick={() => navigate(`/editblog/${blog.id}`)}
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
// //                 >
// //                   ✏️ Edit
// //                 </button>

// //                 <button
// //                   onClick={() => handleDelete(blog.id)}
// //                   className="px-4 py-2 bg-red-600 text-white rounded-md"
// //                 >
// //                   🗑️ Delete
// //                 </button>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// }

// export default AuthorDashboard;


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";

function AuthorDashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { authorId } = useAuthor(); // Assuming this provides the author ID

  useEffect(() => {
    async function fetchAuthorBlogs(id) {
      try {
        const response = await fetch(`http://localhost:5233/api/Author/by-id/${id}`);
        
        if (!response.ok) {
          throw new Error('Author not found');
        }

        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the response to check

        if (data && data.blogs) {
          setBlogs(data.blogs); // Set blogs to state
        }
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    }

    // Fetch blogs if authorId is available
    if (authorId) {
      fetchAuthorBlogs(authorId);
    }
  }, [authorId]);

  // Handle blog deletion
  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
          method: "DELETE",
        });
        setBlogs(blogs.filter((blog) => blog.blogId !== blogId)); // Remove deleted blog from state
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-forest)]">Your Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found. Start writing now!</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.blogId} className="border-b py-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content.slice(0, 100)}...</p>

              <div className="mt-2">
                <button
                  onClick={() => navigate(`/editblog/${blog.blogId}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(blog.blogId)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuthorDashboard;
