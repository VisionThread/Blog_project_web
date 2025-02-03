import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5233/api/Blog/${blogId}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  // Handle input change
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5233/api/Blog/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
      navigate("/authordashboard"); // Redirect to dashboard after update
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
          onClick={() => navigate("/authordashboard")}
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
