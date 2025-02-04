

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../RoutesConstant";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-md mx-auto  p-8 rounded-lg shadow-sm">


//       <h1 className="text-4xl font-extrabold text-[var(--color-forest)] mb-7">
//         Welcome to the Blog Website
//       </h1>
//       <p className="text-xl text-[var(--color-bark)] mb-6">
//         Explore and create amazing blogs!
//       </p>

//       {/* Options to choose */}
//       <div className="flex flex-col sm:flex-row gap-10">
//         {/* Create Blog Option */}
//         <button
//           onClick={() => navigate("/addblog")}
//           className="px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
//         >
//           ✍️ Create a Blog
//         </button>

//         {/* Search Blogs by Author */}
//         <button
//           onClick={() => navigate("/AuthorSearch")}
//           className="px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
//         >
//           🔍 Search Blogs by Author
//         </button>


//         {/* Search Blogs by title */}
//         <button
//   onClick={() => navigate(ROUTES.BLOG_SEARCH)}
//   className="px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
// >
//   🔍 Search Blogs by title
// </button>


//       </div>
     
      

//       <button
//   onClick={() => navigate("/authordashboard")}
//   className="p-3 bg-[var(--color-forest)] text-white rounded-md mt-4"
// >
//   📖 Manage Your Blogs
// </button>
//     </div>


//   );
// }

// export default Home;



import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../RoutesConstant";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10">
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
            onClick={() => navigate("/addblog")}
            className="w-full px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
          >
            ✍️ Create a Blog
          </button>
          
          <button
            onClick={() => navigate("/AuthorSearch")}
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
            onClick={() => navigate("/authordashboard")}
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