import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";
import "../css/Home.css";
import { FaTrash, FaEdit, FaSearch, FaPen, FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Let Your Ideas Flow with InkSpire!</h1>
        <p className="home-description">
          Explore, create, and manage amazing blogs!
        </p>

        <div className="button-group">
          <button
            onClick={() => navigate(ROUTES.ADD_BLOG)}
            className="home-button"
          >
            <FaPen
              style={{
                marginRight: "8px",
                fontSize: "1rem",
                color: "rgb(244, 197, 66)",
              }}
            />
            Create a Blog
          </button>

          <button
            onClick={() => navigate(ROUTES.AUTHOR_SEARCH)}
            className="home-button"
          >
            <FaUser
              style={{
                marginRight: "8px",
                fontSize: "1rem",
                color: "rgb(228, 198, 137)",
              }}
            />
            Search Blogs by Author
          </button>
        </div>

        <div className="button-group">
          <button
            onClick={() => navigate(ROUTES.BLOG_SEARCH)}
            className="home-button"
          >
            <FaSearch
              style={{
                marginRight: "8px",
                fontSize: "1rem",
                color: "lightblue",
              }}
            />
            Search Blogs by Title
          </button>

          <button
            onClick={() => navigate(ROUTES.AUTHOR_DASHBOARD)}
            className="home-button"
          >
            <FaBook
              style={{
                marginRight: "8px",
                fontSize: "1rem",
                color: "rgb(195, 227, 223)",
              }}
            />
            Manage Your Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
