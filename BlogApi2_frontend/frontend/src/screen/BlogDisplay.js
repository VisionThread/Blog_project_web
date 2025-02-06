
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useAuthor } from "../context/AuthorContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const blogIdInt = parseInt(blogId, 10);
  const [commentText, setCommentText] = useState(""); // State to hold comment input
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submitting status
  const [blogData, setBlogData] = useState(null);
  const { authorId ,authorName } = useAuthor();
  const [submittedComment,setSubmitComment]=useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5233/api/Blog/${blogIdInt}`);
        const data = await response.json();
        console.log(data);
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("An unexpected error !")
      }
    };

    fetchBlog();
  }, [blogIdInt]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.warn("Please enter the comment")
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
      CreatedAt: new Date().toISOString(), // Or you can provide a specific time
      AuthorId: authorId, // Replace with actual logged-in user ID
    };

    try {
      const response = await fetch("http://localhost:5233/api/Comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const newComment = await response.json();
        setSubmitComment(newComment.commentText)
        console.log(newComment.commentText + authorName);
        toast.success("Comment added successfully!");
        setCommentText(""); // Reset comment field after submission
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("An unexpected error !")
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {blogData ? (
          <>
            <h1 className="text-3xl font-bold text-[var(--color-forest)]">{blogData.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{blogData.content}</p>
            <div className="mt-6 text-gray-500 flex justify-between">
              <span>✍️ By {blogData.authorName}</span>
              <span>📅 {new Date(blogData.createdAt).toLocaleDateString()}</span>
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-600">Loading blog...</p>
        )}
      </div>



      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold text-[var(--color-forest)]">Add a Comment</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full mt-4 p-4 border border-gray-300 rounded-lg"
            rows="4"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Enter your comment here..."
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 px-5 py-2 bg-[var(--color-forest)] text-white text-lg rounded-lg shadow-md ${
              isSubmitting ? "bg-gray-400" : "hover:bg-green-700"
            } transition-all`}
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>

        <div className="mt-6">
    <h3 className="font-semibold">{authorName}</h3>
    <p className="text-gray-600">{submittedComment}</p>
  </div> 
      </div>

     


      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-5 py-2 bg-[var(--color-forest)] text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-all"
      >
        ⬅️ Go Back
      </button>
    </div>
  );
}

export default BlogDetailPage;
