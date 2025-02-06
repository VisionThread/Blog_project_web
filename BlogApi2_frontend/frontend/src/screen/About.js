import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";
function AboutPage() {

const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto  p-8 rounded-lg shadow-sm">
      <h1 className="text-3xl font-extrabold text-[var(--color-forest)] mb-2">
        About This Blog
      </h1>
  
      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        This platform is for writers, thinkers, and creators to share 
        their insights with the world. Whether you're a beginner or 
        an experienced blogger, this space is for **you**.
      </p>
  
      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        ✨ Discover inspiring blogs, create meaningful content, and 
        connect with a community of like-minded individuals.
      </p>
  
      <p className="text-sm text-gray-700 leading-relaxed">
        Start your journey today and let your words make an impact! 🚀
      </p>
  
      <div className="mt-3 flex flex-col gap-2">
        <a
          onClick={() => navigate(ROUTES.ADD_BLOG)}
          className="px-4 py-2 bg-[var(--color-forest)] text-white text-sm rounded-md shadow-md hover:bg-green-700 transition-all"
        >
          ✍️ Start Blogging
        </a>
  
        <a
          href="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md shadow-md hover:bg-gray-400 transition-all"
        >
          🔙 Back to Home
        </a>
      </div>
    
  </div>
    
   
  
  
  );
}

export default AboutPage;
