import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { useBlog } from "../context/BlogContext";
import { ROUTES } from "../RoutesConstant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Addblog.css";
import BlogService from "../services/blogService";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogId, setBlogId] = useState(null);
  const { authorId } = useAuthor();

  const { saveBlogId } = useBlog();
  const navigate = useNavigate();
  const toastshow = useRef(false);

  useEffect(() => {
    if (!authorId && !toastshow.current) {
      toast.error("Please log in to create a blog");
      toastshow.current = true;
      navigate(ROUTES.LOGIN);
    }
  }, [authorId, navigate]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const blogData = {
      Title: title,
      Content: content,
      createdAt: new Date().toISOString(),
      AuthorId: authorId,
    };

    try {
      const response = await BlogService.createBlog(blogData);
      if (response) {
        setBlogId(response.id);
        saveBlogId(response.id);
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
    <div className="blog-container">
      <h1 className="blog-heading">Create a New Blog</h1>
      <form onSubmit={handleCreateBlog} className="blog-form">
        <div>
          <label htmlFor="title" className="blog-label">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="blog-input"
          />
        </div>
        <div>
          <label htmlFor="content" className="blog-form">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className="blog-textarea"
          />
        </div>
        <button type="submit" className="blog-submit">
          Create Blog
        </button>
      </form>
      {blogId && (
        <button
          className="blog-preview"
          onClick={() => navigate(`/blog/${blogId}`)}
        >
          Preview Blog
        </button>
      )}

      <button onClick={() => navigate(-1)} className="blog-back">
        ⬅️ Go Back
      </button>
    </div>
  );
}

export default AddBlog;
