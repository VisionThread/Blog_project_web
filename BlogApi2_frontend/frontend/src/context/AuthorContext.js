// import React, { createContext, useContext, useState } from 'react';

// // Create a context to store author data
// const AuthorContext = createContext();

// // AuthorProvider component to wrap your app and provide context
// export const AuthorProvider = ({ children }) => {
//   const [authorId, setAuthorId] = useState({ id: null });

//   const login = (i) => {
//     setAuthorId(id);
//   };

//   const logout = () => {
//     setAuthorId(null);// Reset authorId on logout
//   };

//   return (
//     <AuthorContext.Provider value={{ authorId, login, logout }}>
//       {children}
//     </AuthorContext.Provider>
//   );
// };

// // Custom hook to access the AuthorContext
// export const useAuthor = () => {
//   return useContext(AuthorContext);
// };

import React, { createContext, useContext, useState } from "react";

// Create a context to store author data
const AuthorContext = createContext();

// AuthorProvider component to wrap your app and provide context
export const AuthorProvider = ({ children }) => {
  const [authorId, setAuthorId] = useState(null);
  const [authorName, setAuthorName] = useState("");

  const login = (id, name) => {
    setAuthorId(id); // Store authorId
    setAuthorName(name); // Store author name
  };

  const logout = () => {
    setAuthorId(null); // Reset authorId on logout
    setAuthorName(""); // Reset author name on logout
  };

  return (
    <AuthorContext.Provider value={{ authorId, authorName, login, logout }}>
      {children}
    </AuthorContext.Provider>
  );
};

// Custom hook to access the AuthorContext
export const useAuthor = () => {
  return useContext(AuthorContext);
};
