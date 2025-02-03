// import React from "react"
// import { Link, useLocation } from "react-router-dom"

// const Navbar = () => {
//   const location = useLocation()

//   return (
//     <nav className="bg-[var(--color-forest)] p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-2xl font-bold">
//           NatureApp
//         </Link>
//         <div className="space-x-4">
//           <NavLink href="/login" current={location.pathname}>
//             Login
//           </NavLink>
//           <NavLink href="/register" current={location.pathname}>
//             Register
//           </NavLink>
//           <NavLink href="/about" current={location.pathname}>
//             About
//           </NavLink>
//           <NavLink href="/Home" current={location.pathname}>
//             Home
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   )
// }

// const NavLink = ({ href, children, current }) => {
//   const isActive = current === href
//   return (
//     <Link
//       to={href}
//       className={`${
//         isActive
//           ? "bg-[var(--color-sage)] text-[var(--color-bark)]"
//           : "text-white hover:bg-[var(--color-sage)] hover:text-[var(--color-bark)]"
//       } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
//     >
//       {children}
//     </Link>
//   )
// }

// export default Navbar

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-emerald-800 to-green-700 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
      <NavLink
  to="/"
  className="text-white text-4xl font-extrabold tracking-wider hover:text-emerald-400 transition-colors duration-300 transform hover:scale-105"
  style={{ fontFamily: 'Dancing Script, cursive' }}
>
  InkSpire
</NavLink>

        <div className="flex space-x-1 sm:space-x-2 mt-4 sm:mt-0">
          <CustomNavLink to="/login">Login</CustomNavLink>
          <CustomNavLink to="/register">Register</CustomNavLink>
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

export default Navbar;

