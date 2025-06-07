import React, { createContext, useEffect, useContext, useState } from "react";

const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authorId, setAuthorId] = useState(
    () => localStorage.getItem("authorId") || null
  );
  const [authorName, setAuthorName] = useState(
    () => localStorage.getItem("authorName") || ""
  );

  useEffect(() => {
    if (authorId) {
      localStorage.setItem("authorId", authorId);
    } else {
      localStorage.removeItem("authorId");
    }

    if (authorName) {
      localStorage.setItem("authorName", authorName);
    } else {
      localStorage.removeItem("authorName");
    }
  }, [authorId, authorName]);

  const login = (id, name) => {
    setAuthorId(id);
    setAuthorName(name);
  };

  const logout = () => {
    setAuthorId(null);
    setAuthorName("");
    localStorage.removeItem("authorId");
    localStorage.removeItem("authorName");
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
