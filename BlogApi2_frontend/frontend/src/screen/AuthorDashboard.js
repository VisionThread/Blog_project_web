import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { ROUTES } from "../RoutesConstant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/AuthorBlogDashboard.css";
import BlogService from "../services/blogService";
import authorService from "../services/authorService";

function AuthorDashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { authorId } = useAuthor(); // Assuming this provides the author ID

  useEffect(() => {
    async function fetchAuthorBlogs(id) {
      try {
        const response = await authorService.getAuthorById(id);
        console.log(response);
        if (!response) {
          throw new Error("Author not found");
        }
        if (response && response.blogs) {
          setBlogs(response.blogs); // Set blogs to state
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    }

    // Fetch blogs if authorId is available
    if (authorId) {
      fetchAuthorBlogs(authorId);
    }
  }, [authorId]);

  //confirmation of deletion
  const showDeleteConfirmation = (blogid) => {
    // Creating a custom toast for confirmation
    toast(
      <div>
        <p>Are you sure you want to delete this blog?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleDelete(blogid, true)} // If Yes is clicked
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => handleDelete(blogid, false)} // If No is clicked
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 4000, // Prevent auto-close
        closeOnClick: false, // Prevent closing when clicking on the toast
        draggable: false, // Make it not draggable
      }
    );
  };

  const handleDelete = async (blogId, isConfirmed) => {
    if (!isConfirmed) {
      toast.info("Blog deletion canceled.");
      return;
    }

    try {
      await BlogService.deleteBlog(blogId);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.blogId !== blogId)
      ); // Update state
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog. Please try again.");
    }
  };

  const handleDeleteClick = (blogId) => {
    showDeleteConfirmation(blogId); // Trigger the confirmation toast
  };

  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Your Blogs</h1>

      {blogs.length === 0 ? (
        <p className="no-blogs-text">No blogs found. Start writing now!</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.blogId} className="blog-item">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-content">{blog.content.slice(0, 100)}...</p>

              <div className="button-group1">
                <button
                  onClick={() => navigate(`/editblog/${blog.blogId}`)}
                  className="edit-button"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDeleteClick(blog.blogId)}
                  className="delete-button"
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
