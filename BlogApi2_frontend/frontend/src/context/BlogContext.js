// import React, { createContext, useContext, useState } from "react";

// // Create a context for managing blog ID
// const BlogContext = createContext();

// // Create a custom hook to use the BlogContext
// export const useBlog = () => {
//   return useContext(BlogContext);
// };

// // Provider component to wrap the app and provide the blog ID
// export const BlogProvider = ({ children }) => {
//   const [blogId, setBlogId] = useState(null); // Initial state is null

//   // Function to set the blog ID
//   const saveBlogId = (id) => {
//     setBlogId(id);
//   };

//   return (
//     <BlogContext.Provider value={{ blogId, saveBlogId }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };


import React, { createContext, useState, useContext } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogId, setBlogId] = useState(null); // Store Blog ID here

  const saveBlogId = (id) => {
    setBlogId(id); // Set the Blog ID when a new blog is created
  };

  return (
    <BlogContext.Provider value={{ blogId, saveBlogId }}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to access BlogContext
export const useBlog = () => useContext(BlogContext);
