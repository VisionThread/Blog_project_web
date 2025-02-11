import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../RoutesConstant";
import "../css/Login.css";
import authorService from "../services/authorService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthor();

  const logInUser = { email, password };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await authorService.authorLogin(logInUser);

    if (response) {
      toast.success("Login successful!");
      // Proceed with the login
      login(response.authorId, response.name);
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 2000);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleLogin} className="form-content">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?
          <Link to={ROUTES.REGISTER} className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
