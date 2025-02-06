import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { useBlog } from "../context/BlogContext";
import { ROUTES } from "../RoutesConstant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogId, setBlogId] = useState(null);
  const { authorId } = useAuthor(); // Access authorId and authorName

  const { saveBlogId } = useBlog();
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!authorId) {
      toast.error("Please log in to create a blog");
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
        // alert("Blog created successfully!");
        toast.success("Blog created successfully! 🎉");
      } else {
        toast.error("Failed to create blog ! ❌ ");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white px-2 py-2 rounded-lg shadow-xl">
      <h1 className="text-xl font-semibold mb-6 text-[var(--color-forest)] text-center">
        Create a New Blog
      </h1>
      <form onSubmit={handleCreateBlog} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-[var(--color-bark)] mb-2 font-medium"
          >
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
          <label
            htmlFor="content"
            className="block text-[var(--color-bark)] mb-2 font-medium"
          >
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

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-5 py-2 bg-[var(--color-forest)] text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-all"
      >
        ⬅️ Go Back
      </button>
    </div>
  );
}

export default AddBlog;
