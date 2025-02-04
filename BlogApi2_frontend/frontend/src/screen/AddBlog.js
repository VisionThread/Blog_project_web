
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthor } from "../context/AuthorContext";
// import { useBlog } from "../context/BlogContext";

// function AddBlog() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [blogId, setBlogId] = useState(null); // Store the created blog ID
//   const { authorId } = useAuthor();
//   const { saveBlogId } = useBlog();
//   const navigate = useNavigate();

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();

//     if (!authorId) {
//       alert("Please log in to create a blog!");
//       return;
//     }

//     const blogData = {
//       Title: title,
//       Content: content,
//       AuthorId: authorId,
//     };

//     // API call to create blog
//     const response = await fetch("http://localhost:5233/api/Blog", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(blogData),
//     });

//     const data2 = await response.json();
//     if (response.ok) {
//       setBlogId(data2.id); // Store blog ID
//       saveBlogId(data2.id);
//       alert("Blog created successfully!");
//     } else {
//       alert("Failed to create blog");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Create Blog</h1>
//       <form onSubmit={handleCreateBlog} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block mb-1 text-[var(--color-bark)]">
//             Blog Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
//           />
//         </div>
//         <div>
//           <label htmlFor="content" className="block mb-1 text-[var(--color-bark)]">
//             Content
//           </label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//             rows="5"
//             className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 rounded bg-[var(--color-forest)] text-white transition-colors duration-200 hover:bg-[var(--color-sage)]"
//         >
//           Create Blog
//         </button>
//       </form>

//       {/* Show Preview Button only after Blog Creation */}
//       {blogId && (
//         <button
//           className="w-full mt-4 py-2 rounded bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-500"
//           onClick={() => navigate(`/blog/${blogId}`)}
//         >
//           Preview Blog
//         </button>
//       )}
//     </div>
//   );
// }

// export default AddBlog;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { useBlog } from "../context/BlogContext";
import { ROUTES } from "../RoutesConstant";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogId, setBlogId] = useState(null);
  const { authorId, authorName } = useAuthor(); // Access authorId and authorName

  const { saveBlogId } = useBlog();
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!authorId) {
      alert("Please log in to create a blog!");
      navigate(ROUTES.LOGIN); // Optionally redirect to login page
      return;
    }

    const blogData = {
      Title: title,
      Content: content,
      AuthorId: authorId,
    };

    try {
      const response = await fetch("http://localhost:5233/api/Blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        setBlogId(data.id);
        saveBlogId(data.id); // Save the blog ID in the context
        alert("Blog created successfully!");
      } else {
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-2xl font-semibold mb-6 text-[var(--color-forest)] text-center">
        Create a New Blog
      </h1>
      <form onSubmit={handleCreateBlog} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-[var(--color-bark)] mb-2 font-medium">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-[var(--color-sage)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition duration-300"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-[var(--color-bark)] mb-2 font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className="w-full px-4 py-3 border border-[var(--color-sage)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-forest)] text-white font-semibold transition-colors duration-300 hover:bg-[var(--color-sage)]"
        >
          Create Blog
        </button>
      </form>

      {/* Show Preview Button only after Blog Creation */}
      {blogId && (
        <button
          className="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white font-semibold transition-colors duration-300 hover:bg-blue-500"
          onClick={() => navigate(`/blog/${blogId}`)}
        >
          Preview Blog
        </button>
      )}
    </div>
  );
}

export default AddBlog;
