// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function EditBlog() {
//   const { blogId } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState({ title: "", content: "" });
//   console.log(blogId);

//   // Fetch blog details
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`);
//         const data = await response.json();
//         console.log(data);
//         setBlog(data);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   // Handle input change
//   const handleChange = (e) => {
//     setBlog({ ...blog, [e.target.name]: e.target.value });
//   };

//   // Handle update submission
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
//         method: "PUT",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(blog),
//       });
  
//       if (!response.ok) {
//         const errorDetail = await response.text();
//         console.error("Error response:", errorDetail);
//         throw new Error(`Error: ${response.statusText}, ${errorDetail}`);
//       }
  
//       navigate("/authordashboard"); // Redirect to dashboard after update
//     } catch (error) {
//       console.error("Error updating blog:", error);
//     }
//   };
  

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Edit Your Blog</h1>

//       <form onSubmit={handleUpdate}>
//         <input
//           type="text"
//           name="title"
//           value={blog.title}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Blog Title"
//         />

//         <textarea
//           name="content"
//           value={blog.content}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-4"
//           rows="5"
//           placeholder="Blog Content"
//         />

//         <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
//           ✅ Save Changes
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/authordashboard")}
//           className="px-6 py-2 bg-gray-500 text-white rounded-md ml-2"
//         >
//           ❌ Cancel
//         </button>

//         <button   
//   type="button"
//   onClick={() => navigate(`/blog/${blogId}`)}
//   className="px-6 py-2 bg-gray-500 text-white rounded-md ml-2 hover:bg-gray-600 transition"
// >
//   Preview
// </button>

//       </form>
//     </div>
//   );
// }

// export default EditBlog;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function EditBlog() {
//   const { blogId } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState({ title: "", content: "", authorId: "" });
//   const [error, setError] = useState(null);

//   // Fetch blog details
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`);
//         if (!response.ok) {
//           throw new Error("Blog not found");
//         }
//         const data = await response.json();
//         setBlog(data);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//         setError("Error fetching blog");
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   // Handle input change
//   const handleChange = (e) => {
//     setBlog({ ...blog, [e.target.name]: e.target.value });
//   };

//   // Handle update submission
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       // Assuming the logged-in author's ID is stored in localStorage
//       const loggedInAuthorId = localStorage.getItem("authorId"); // Or retrieve it from context or token

//       // If the logged-in author's ID doesn't match the blog's authorId, don't allow edit
//       if (blog.authorId !== loggedInAuthorId) {
//         throw new Error("You are not authorized to edit this blog.");
//       }

//       // Update the blog with the authorId
//       const updatedBlog = { ...blog, authorId: loggedInAuthorId };

//       const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
//         method: "PUT",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Optional: JWT token
//         },
//         body: JSON.stringify(updatedBlog),
//       });

//       if (!response.ok) {
//         const errorDetail = await response.text();
//         console.error("Error response:", errorDetail);
//         throw new Error(`Error: ${response.statusText}, ${errorDetail}`);
//       }

//       navigate("/authordashboard"); // Redirect to dashboard after update
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       setError("Failed to update blog. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Edit Your Blog</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleUpdate}>
//         <input
//           type="text"
//           name="title"
//           value={blog.title}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Blog Title"
//         />

//         <textarea
//           name="content"
//           value={blog.content}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-4"
//           rows="5"
//           placeholder="Blog Content"
//         />

//         <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
//           ✅ Save Changes
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/authordashboard")}
//           className="px-6 py-2 bg-gray-500 text-white rounded-md ml-2"
//         >
//           ❌ Cancel
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate(`/blog/${blogId}`)}
//           className="px-6 py-2 bg-gray-500 text-white rounded-md ml-2 hover:bg-gray-600 transition"
//         >
//           Preview
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditBlog;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [error, setError] = useState(""); // To capture error messages

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`);
        const data = await response.json();
        if (response.ok) {
          setBlog(data);
        } else {
          throw new Error(data.message || "Failed to fetch blog");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  // Handle input change
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Ensure to add token or session info
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        setError(errorDetail);
        throw new Error(`Error: ${response.statusText}, ${errorDetail}`);
      }

      // Redirect to dashboard after successful update
      navigate("/authordashboard");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Edit Your Blog</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          placeholder="Blog Title"
        />

        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          rows="5"
          placeholder="Blog Content"
        />

        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
          ✅ Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/authordashboard")}
          className="px-6 py-2 bg-gray-500 text-white rounded-md ml-2"
        >
          ❌ Cancel
        </button>

        <button
          type="button"
          onClick={() => navigate(`/blog/${blogId}`)}
          className="px-6 py-2 bg-gray-500 text-white rounded-md ml-2 hover:bg-gray-600 transition"
        >
          Preview
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
