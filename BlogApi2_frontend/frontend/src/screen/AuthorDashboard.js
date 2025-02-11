import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
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
    toast(
      ({ closeToast }) => (
        <div className="delete-toast">
          <p>Are you sure you want to delete this blog?</p>
          <div className="button-group2">
            <button className="yes-btn" 
              onClick={() => {
                handleDelete(blogid, true); // Perform deletion
                setTimeout(closeToast, 200); // Close toast after 2 seconds
              }}>
              Yes
            </button>
            <button className="no-btn" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right", // Ensure it appears at the center
        autoClose:false, // Prevents auto-closing
        closeOnClick: false, // Prevent accidental closing
        closeButton: false, // Hide default close button
        draggable: false,
        hideProgressBar: true, // Remove progress bar
      }
    );
  };
  
  

  const handleDelete = async (blogId, isConfirmed) => {
    if (!isConfirmed) {
      //toast.info("Blog deletion canceled.");
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
