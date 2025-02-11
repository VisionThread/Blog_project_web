import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header Section */}
        <h1 className="home-title">Let Your Ideas Flow with InkSpire!</h1>
        <p className="home-description">
          Explore, create, and manage amazing blogs!
        </p>

        {/* Buttons Section */}
        <div className="button-group">
          <button
            onClick={() => navigate(ROUTES.ADD_BLOG)}
            className="home-button"
          >
            ✍️ Create a Blog
          </button>

          <button
            onClick={() => navigate(ROUTES.AUTHOR_SEARCH)}
            className="home-button"
          >
            🔍 Search Blogs by Author
          </button>
        </div>

        <div className="button-group">
          <button
            onClick={() => navigate(ROUTES.BLOG_SEARCH)}
            className="home-button"
          >
            🔍 Search Blogs by Title
          </button>

          <button
            onClick={() => navigate(ROUTES.AUTHOR_DASHBOARD)}
            className="home-button"
          >
            📖 Manage Your Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
