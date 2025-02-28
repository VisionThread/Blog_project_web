import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/AuthorBlogDashboard.css";
import BlogService from "../services/blogService";
import authorService from "../services/authorService";
import { ROUTES } from "../RoutesConstant";

function AuthorDashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { authorId } = useAuthor(); 

  
      useEffect(() => {
        if (!authorId) {
          console.warn("User is not logged in. Redirecting to login...");
          navigate(ROUTES.LOGIN);
        }
      }, [authorId, navigate]);

  useEffect(() => {
    async function fetchAuthorBlogs(id) {
      try {
        const response = await authorService.getAuthorById(id);
        setBlogs(response?.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    }

   
    if (authorId) {
      fetchAuthorBlogs(authorId);
    }
  }, [authorId]);

  
  const showDeleteConfirmation = (blogid) => {
    toast(
      ({ closeToast }) => (
        <div className="delete-toast">
          <p>Are you sure you want to delete this blog?</p>
          <div className="button-group2">
            <button className="yes-btn" 
              onClick={() => {
                handleDelete(blogid, true); 
                toast.dismiss(); 
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
        position: "top-right", 
        autoClose:false, 
        closeOnClick: false, 
        closeButton: false, 
        draggable: false,
        hideProgressBar: true, 
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
      ); 
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog. Please try again.");
    }
  };

  const handleDeleteClick = (blogId) => {
    showDeleteConfirmation(blogId); 
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
