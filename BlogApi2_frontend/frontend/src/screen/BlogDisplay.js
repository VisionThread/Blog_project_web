import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/BlogDisplay.css";
import BlogService from "../services/blogService";
import commentService from "../services/commentService";

function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const blogIdInt = parseInt(blogId, 10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const { authorId, authorName } = useAuthor();
  const [commentText, setCommentText] = useState(""); // ✅ Added missing state
  const [submittedComment, setSubmittedComment] = useState(""); // ✅ Fixed naming
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await BlogService.getBlogById(blogIdInt);
        setBlogData(response);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("An unexpected error occurred!");
      }
    };

    fetchBlog();
  }, [blogIdInt]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // const response = await fetch(
        //   `http://localhost:5233/api/Comment/blog/${blogIdInt}`
        // );
        const response = await commentService.getCommentsByBlog(blogIdInt);
        if (!response) throw new Error("Failed to load comments.");
        //const data = await response.json();
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Could not load comments. Please try again later.");
      }
    };

    fetchComments();
  }, [blogIdInt]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.warn("Please enter a comment.");
      return;
    }

    if (!authorId) {
      toast.error("Please log in to comment.");
      return;
    }

    setIsSubmitting(true);

    const commentData = {
      BlogId: blogIdInt,
      CommentText: commentText,
      CreatedAt: new Date().toISOString(),
      AuthorId: authorId,
    };

    try {
      // const response = await fetch("http://localhost:5233/api/Comment", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(commentData),
      // });

      const response = await commentService.CommentPost(commentData);

      if (response) {
        const newComment = await response;
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentText(""); // ✅ Clear input after submission
        setSubmittedComment(commentText); // ✅ Update UI
        toast.success("Comment added successfully!");
      } else {
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("An unexpected error occurred!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="blog-post">
        {blogData ? (
          <>
            <h1 className="blog-title">{blogData.title}</h1>
            <p className="blog-content">{blogData.content}</p>
            <div className="blog-meta">
              <span>✍️ By {blogData.authorName}</span>
              <span>
                📅{" "}
                {new Date(blogData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </>
        ) : (
          <p className="loading-text">Loading blog...</p>
        )}
      </div>

      <div className="comment-section">
        <h2 className="comment-header">Add a Comment</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="comment-textarea"
            rows="4"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Enter your comment here..."
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "disabled" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </div>

      {/* Submitted Comment Preview */}

      {/* Comment List */}
      <div className="comments-list">
        <h2 className="comment-header">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item comment">
              <h3 className="author-name">
                {comment.authorName || authorName || "Anonymous"}
              </h3>
              <p className="comment-content">{comment.commentText || submittedComment}</p>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        )}
     

      {/* {submittedComment && (
          <div className="submitted-comment comment">
            <h3 className="author-name">{authorName}</h3>
            <p className="comment-content">{submittedComment}</p>
          </div>
        )} */}
       </div>
      {/* Go Back Button */}
      <button onClick={() => navigate(-1)} className="go-back-button">
        ⬅️ Go Back
      </button>
    </div>
  );
}

export default BlogDetailPage;
