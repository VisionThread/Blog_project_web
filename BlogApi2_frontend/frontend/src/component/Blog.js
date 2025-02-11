// // BlogDetail.js
// import React from "react";

function BlogDetail({ blog, authorName, onBack }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
      <button onClick={onBack} className="text-blue-500">Back to Blog List</button>
      <h3 className="text-2xl font-semibold mt-4">{blog.title}</h3>
      <p className="text-lg mt-2">{blog.content}</p>
      <div className="mt-4">
        <span className="text-gray-500">By {authorName}</span>
        <span className="text-gray-500 ml-4">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default BlogDetail;
