// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//  // const [author, setAuthor] = useState("");
//   const navigate = useNavigate();

//   return (
//     <div className="text-center">
//       <h1 className="text-4xl font-bold mb-4 text-[var(--color-forest)]">Welcome to the Blog Website</h1>
//       <p className="text-xl text-[var(--color-bark)]">Explore and create blogs!</p>

//       {/* Options to choose */}
//       <div className="mt-8">
//         {/* Create Blog Option */}
//         <button
//           onClick={() => navigate("/addblog")}
//           className="p-3 bg-[var(--color-forest)] text-white rounded-md m-2"
//         >
//           Create a Blog
//         </button>

       

// <button
//        onClick={() => navigate("/AuthorSearch")}
//       className="p-2 bg-[var(--color-forest)] text-white rounded-md mt-4"
//     >
//       Search Blogs by Author
//     </button>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-5xl font-extrabold text-[var(--color-forest)] mb-4">
        Welcome to the Blog Website
      </h1>
      <p className="text-xl text-[var(--color-bark)] mb-6">
        Explore and create amazing blogs!
      </p>

      {/* Options to choose */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Create Blog Option */}
        <button
          onClick={() => navigate("/addblog")}
          className="px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
        >
          ✍️ Create a Blog
        </button>

        {/* Search Blogs by Author */}
        <button
          onClick={() => navigate("/AuthorSearch")}
          className="px-6 py-3 text-lg bg-[var(--color-forest)] text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
        >
          🔍 Search Blogs by Author
        </button>
      </div>

      <button
  onClick={() => navigate("/authordashboard")}
  className="p-3 bg-[var(--color-forest)] text-white rounded-md mt-4"
>
  📖 Manage Your Blogs
</button>
    </div>
  );
}

export default Home;
