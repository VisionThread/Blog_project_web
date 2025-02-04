

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to hold the success/error message
  const [messageColor, setMessageColor] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthor();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5233/api/Author/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

if (response.ok) {
  // Show a success message
 
  setMessage("Login Successful!");
  setMessageColor("green");
  // Proceed with the login
  login(data.authorId,data.name);
  setTimeout(() => {
    navigate("/Home");
  }, 2000);
} else {
  // Show an error message if credentials are invalid
  setMessage("Invalid credentials");
      setMessageColor("red");
}
setTimeout(() => {
  setMessage(""); 
}, 3000);
  };

  return (
    <div className="max-w-md mx-auto  p-8 rounded-lg shadow-sm">
      <div className="w-full max-w-sm bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-green-600 text-white font-semibold transition duration-200 hover:bg-green-500"
          >
            Login
          </button>
        </form>
       
        {message && (
          <div style={{ color: messageColor }} className="mt-4 text-center">
            {message}
          </div>
        )}



        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <Link to="/register" className="text-green-600 hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
