

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // For accessing the blogId from the URL

// function BlogDetailPage() {
//   const { blogId } = useParams(); // Get the blogId from the URL parameter
//   console.log("Blog ID:", blogId); // Log the blogId to the console (it should be a string by default)

//   // If you want it as an integer:
// const blogIdInt = parseInt(blogId, 10);
// //const blogIdInt = 21;
//   console.log("Blog ID as integer:", blogIdInt);

//   const [blogData, setBlogData] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await fetch(`http://localhost:5233/api/Blog/${blogIdInt}`);
//         console.log(response); // Check response status and body
//         const data = await response.json();
//         setBlogData(data);
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       }
//     };

//     fetchBlog();
//   }, [blogIdInt]); // Fetch the blog whenever the blogId changes

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       {blogData ? (
//         <div>
//           <h3 className="text-2xl font-semibold">{blogData.title}</h3>
//           <p className="mt-2">{blogData.content}</p>
//           <div className="mt-4">
//             <span className="text-gray-500">By {blogData.authorName}</span>
//             <span className="text-gray-500 ml-4">
//               {new Date(blogData.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
//       ) : (
//         <p>Loading blog...</p>
//       )}
//     </div>
//   );
// }

// export default BlogDetailPage;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate

function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const blogIdInt = parseInt(blogId, 10);

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5233/api/Blog/${blogIdInt}`);
        const data = await response.json();
        console.log(data);
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [blogIdInt]);

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
