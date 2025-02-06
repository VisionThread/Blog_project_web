
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-8 py-10">
      <div className="max-w-3xl w-full text-center p-8 bg-gray-100 rounded-lg shadow-lg">
        {/* Header Section */}
        <h1 className="text-5xl font-bold text-[var(--color-forest)] mb-4">
          Welcome to the Blog Website
        </h1>
        <p className="text-lg text-[var(--color-bark)] mb-6">
          Explore, create, and manage amazing blogs!
        </p>

        {/* Buttons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => navigate(ROUTES.ADD_BLOG)}
            className="w-full px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
          >
            ✍️ Create a Blog
          </button>
          
          <button
            onClick={() => navigate(ROUTES.AUTHOR_SEARCH)}
            className="w-full px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
          >
            🔍 Search Blogs by Author
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => navigate(ROUTES.BLOG_SEARCH)}
            className="w-full px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
          >
            🔍 Search Blogs by Title
          </button>
          
          <button
            onClick={() => navigate(ROUTES.AUTHOR_DASHBOARD)}
            className="w-full px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
          >
            📖 Manage Your Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;