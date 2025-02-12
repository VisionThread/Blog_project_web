import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";
import "../css/About.css";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1 className="about-heading">From Passion to Platform🎊</h1>

      <p className="about-text leading-relaxed mb-4">
        This platform is for writers, thinkers, and creators to share their
        insights with the world. Whether you're a beginner or an experienced
        blogger, this space is for you.
      </p>

      <p className="about-text leading-relaxed mb-2">
        ✨ Discover inspiring blogs, create meaningful content, and connect with
        a community of like-minded individuals.
      </p>

      <p className="about-text leading-relaxed">
        Start your journey today and let your words make an impact! 🚀
      </p>

      <div className="about-buttons">
        <button
          onClick={() => navigate(ROUTES.ADD_BLOG)}
          className="start-blogging-button"
        >
          ✍️ Start Blogging
        </button>

        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="back-home-button"
        >
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
