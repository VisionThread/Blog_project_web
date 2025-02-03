// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5233/api/Author/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     console.log(data);
    
//     if (response.ok) {
//       alert("Login Successful");
//       setTimeout(() => {
//         navigate('/about');
//       }, 2000); 
   
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     // <div>
//     //   <h2>Login Page</h2>
//     //   <form onSubmit={handleLogin}>
//     //     <div>
//     //       <label>Email:</label>
//     //       <input
//     //         type="email"
//     //         value={email}
//     //         onChange={(e) => setEmail(e.target.value)}
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label>Password:</label>
//     //       <input
//     //         type="password"
//     //         value={password}
//     //         onChange={(e) => setPassword(e.target.value)}
//     //         required
//     //       />
//     //     </div>
//     //     <button type="submit">Login</button>
//     //   </form>
//     // </div>

//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//     <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Login</h1>
//     <form onSubmit={handleLogin} className="space-y-4">
//       <div>
//         <label htmlFor="email" className="block mb-1 text-[var(--color-bark)]">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="block mb-1 text-[var(--color-bark)]">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full py-2 rounded bg-[var(--color-forest)] text-white transition-colors duration-200 hover:bg-[var(--color-sage)]"
//       >
//         Login
//       </button>
//     </form>
//   </div>
//   );
// }

// export default Login;




// Login.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthor } from "../context/AuthorContext"; // Import useAuthor hook

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthor(); // Get login function from context

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
    console.log(data.authorId);
    
    if (response.ok) {
      alert("Login Successful");

      // Assuming the backend returns the author's data, including their ID
      login(data.authorId); // Set the logged-in author's data in the context

      setTimeout(() => {
        navigate('/Home');
      }, 2000);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-forest)]">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-[var(--color-bark)]">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-[var(--color-bark)]">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--color-sage)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-[var(--color-forest)] text-white transition-colors duration-200 hover:bg-[var(--color-sage)]"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
