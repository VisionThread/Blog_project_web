import React, { createContext, useContext, useState } from "react";

const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authorId, setAuthorId] = useState(null);
  const [authorName, setAuthorName] = useState("");

  const login = (id, name) => {
    setAuthorId(id);
    setAuthorName(name);
    
  };

  const logout = () => {
    setAuthorId(null);
    setAuthorName("");
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
