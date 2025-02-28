import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../RoutesConstant";
import "../css/Register.css";
import authorService from "../services/authorService";

function Register() {
  // State to store the form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Initialize useNavigate hook for redirecting
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();                                                                                                              // is a method that prevents the default behavior of an event in JavaScript.

    // Create the payload to send to the API
    const newUser = { name, email, password };

    try {
      const response = await authorService.authorRegister(newUser);

      if (response) {
        toast.success("Registration successful !");
        navigate(ROUTES.LOGIN);
      
      } else {
        toast.error(`Error: ${response.Message}`);
      }
    } catch (error) {
      
      toast.error("Error :unable to register");
    }
  };

  return (
    <div className="register-container">
      <div className="register-inner-container">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name" className="register-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="register-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-email"
              className="register-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="register-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="register-input"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
