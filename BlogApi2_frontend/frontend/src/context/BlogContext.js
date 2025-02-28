
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
