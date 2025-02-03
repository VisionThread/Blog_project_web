import React, { createContext, useContext, useState } from 'react';

// Create a context to store author data
const AuthorContext = createContext();

// AuthorProvider component to wrap your app and provide context
export const AuthorProvider = ({ children }) => {
  const [authorId, setAuthorId] = useState(null);

  const login = (id) => {
    setAuthorId(id);
  };

  const logout = () => {
    setAuthorId(null); // Reset authorId on logout
  };

  return (
    <AuthorContext.Provider value={{ authorId, login, logout }}>
      {children}
    </AuthorContext.Provider>
  );
};

// Custom hook to access the AuthorContext
export const useAuthor = () => {
  return useContext(AuthorContext);
};
