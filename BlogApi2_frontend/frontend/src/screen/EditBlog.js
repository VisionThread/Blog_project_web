import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";
import { useAuthor } from "../context/AuthorContext";
import "../css/EditBlog.css";
import BlogService from "../services/blogService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const response = await BlogService.getBlogById(blogId);
        console.log(response);
        console.log("Fetched blog:", response);
        setBlog(response);
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
    const updatedData = {
      title: blog.title,
      content: blog.content,
      AuthorId: authorId,
    };

    try {
      // Directly call BlogService.updateBlog and await the result
      const response = await BlogService.updateBlog(blogId, updatedData);
      console.log("Blog updated successfully:", response);

      // No need to check response.ok here because your service method already handles errors
      navigate(ROUTES.AUTHOR_DASHBOARD);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(
        "An error occurred while updating the blog. Please try again."
      );
    }
  };

  return (
    <div className="editor-container">
      <h1 className="editor-title">Edit Your Blog</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="editor-input"
          placeholder="Blog Title"
        />

        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="editor-input"
          rows="5"
          placeholder="Blog Content"
        />

        <button type="submit" className="editor-btn save-btn">
          ✅ Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate(ROUTES.AUTHOR_DASHBOARD)}
          className="editor-btn cancel-btn"
        >
          ❌ Cancel
        </button>

        <button
          type="button"
          onClick={() => navigate(`/blog/${blogId}`)}
          className="editor-btn  preview-btn"
        >
          Preview
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
