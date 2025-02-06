
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";
import { useAuthor } from "../context/AuthorContext";

function EditBlog() {
  const { blogId } = useParams(); // Access blogId from URL params
  const navigate = useNavigate();
  const { authorId } = useAuthor(); // Get authorId from context
  const [blog, setBlog] = useState("");

  console.log("blogId from params:", blogId); // Log blogId

  useEffect(() => {
    if (!blogId) {
      console.error("Blog ID is not available yet");
      return; // Exit if blogId is not available
    }

    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`);
        const data = await response.json();
        console.log("Fetched blog:", data);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]); // Run this effect when blogId changes

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log("Updating blog with:", {
      title: blog.title,
      content: blog.content,
      AuthorId: authorId,
    });



    try {
      const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: blog.title,
          content: blog.content,
          AuthorId: authorId, 
        }),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        console.error("Error response:", errorDetail);
        throw new Error(`Error: ${response.statusText}, ${errorDetail}`);
      }

      navigate(ROUTES.AUTHOR_DASHBOARD);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Edit Your Blog</h1>

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
          onClick={() => navigate(ROUTES.AUTHOR_DASHBOARD)}
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
