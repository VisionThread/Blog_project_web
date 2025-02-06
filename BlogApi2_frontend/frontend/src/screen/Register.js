import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../RoutesConstant";

function Register() {
  // State to store the form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Initialize useNavigate hook for redirecting
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the payload to send to the API
    const newUser = { name, email, password };

    try {
      // Make POST request to the API to register the user
      const response = await fetch('http://localhost:5233/api/Author/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
       toast.success("Registration successful !")

        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 2000); 
      } else {
        toast.error(`Error: ${data.Message}`);
      }
    } catch (error) {
      // setMessage('Error: Unable to register');
      toast.error("Error :unable to register");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-8 rounded-lg shadow-sm">
   <div className="w-full max-w-sm bg-white p-5 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Register</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-[var(--color-bark)]" >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 text-[var(--color-bark)]" >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="new-email"
          className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 text-[var(--color-bark)]" >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded bg-[var(--color-forest)] text-white transition-colors duration-200 hover:bg-[var(--color-sage)]"
      >
        Register
      </button>
    </form>

    {/* {message && <p className="mt-4 text-green-500">{message}</p>} */}
  </div>
  </div>
  );
}

export default Register;
