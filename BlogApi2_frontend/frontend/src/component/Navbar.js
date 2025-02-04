
// import React from "react";
// import { NavLink } from "react-router-dom";
// // import { useAuthor } from "../context/AuthorContext";

// const Navbar = () => {
//   return (
//     <nav className="bg-gradient-to-r from-emerald-800 to-green-700 p-2 shadow-lg">
//       <div className="container mx-auto flex flex-wrap justify-between items-center">
//       <NavLink
//   to="/"
//   className="text-white text-4xl font-extrabold tracking-wider hover:text-emerald-400 transition-colors duration-300 transform hover:scale-105"
//   style={{ fontFamily: 'Dancing Script, cursive' }}
// >
//   InkSpire
// </NavLink>

//         <div className="flex space-x-1 sm:space-x-2 mt-4 sm:mt-0">
//           <CustomNavLink to="/login">Login</CustomNavLink>
//           <CustomNavLink to="/register">Register</CustomNavLink>
//           <CustomNavLink to="/about">About</CustomNavLink>
//           <CustomNavLink to="/home">Home</CustomNavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const CustomNavLink = ({ to, children }) => {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) => `
//         ${isActive ? "bg-emerald-600 text-white" : "text-emerald-100 hover:bg-emerald-600 hover:text-white"}
//         px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
//         transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50
//       `}
//     >
//       {children}
//     </NavLink>
//   );
// };

// export default Navbar;


import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuthor } from "../context/AuthorContext";

const Navbar = () => {
  const { authorId, authorName, logout } = useAuthor(); // Adjusted context values

  return (
    <nav className="bg-gradient-to-r from-emerald-800 to-green-700 p-2 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <NavLink
          to="/"
          className="text-white text-4xl font-extrabold tracking-wider hover:text-emerald-400 transition-colors duration-300 transform hover:scale-105"
          style={{ fontFamily: 'Dancing Script, cursive' }}
        >
          InkSpire
        </NavLink>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {!authorId ? ( // Adjusted condition based on `authorId`
            <>
              <CustomNavLink to="/login">Login</CustomNavLink>
              <CustomNavLink to="/register">Register</CustomNavLink>
            </>
          ) : (
            <UserDropdown authorName={authorName} logout={logout} /> // Passed authorName to UserDropdown
          )}
          <CustomNavLink to="/about">About</CustomNavLink>
          <CustomNavLink to="/home">Home</CustomNavLink>
        </div>
      </div>
    </nav>
  );
};

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => ` 
        ${isActive ? "bg-emerald-600 text-white" : "text-emerald-100 hover:bg-emerald-600 hover:text-white"} 
        px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out 
        transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50
      `}
    >
      {children}
    </NavLink>
  );
};

const UserDropdown = ({ authorName, logout }) => { // Adjusted to receive `authorName`
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-emerald-400 transition duration-300"
      >
        <FaUserCircle className="text-2xl" />
        <span className="text-sm font-medium">{authorName}</span> {/* Display authorName */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-100 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
