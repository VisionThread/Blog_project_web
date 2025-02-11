
import React from "react";
import { NavLink} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuthor } from "../context/AuthorContext";
import { toast } from "react-toastify";
import "../css/Navbar.css"
import {ROUTES} from "../RoutesConstant";

const Navbar = () => {
  const { authorId, authorName, logout } = useAuthor(); // Adjusted context values

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink
          to="/"
          className="navbar-logo"
          style={{ fontFamily: 'Dancing Script, cursive' }}
        >
          InkSpire
        </NavLink>

        <div className="flex-center space-x-2 sm:space-x-4">
          {!authorId ? ( // Adjusted condition based on `authorId`
            <>
              <CustomNavLink to={ROUTES.LOGIN}>Login</CustomNavLink>
              <CustomNavLink to={ROUTES.REGISTER}>Register</CustomNavLink>
            </>
          ) : (
            <UserDropdown authorName={authorName} logout={logout} /> // Passed authorName to UserDropdown
          )}
          <CustomNavLink to={ROUTES.ABOUT}>About</CustomNavLink>
          <CustomNavLink to={ROUTES.HOME}>Home</CustomNavLink>
        </div>
      </div>
    </nav>
  );
};

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "navlink navlink-active" : "navlink navlink-inactive"
      }
    >
      {children}
    </NavLink>
  );
};

const UserDropdown = ({ authorName, logout }) => { // Adjusted to receive `authorName`
  const [isOpen, setIsOpen] = React.useState(false);

const handleLogout = () =>{
  logout();
  toast.success("Logged out successfully! 🙌")
}

  return (
    <div className="dropdown-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
      >
        <FaUserCircle className="icon-size" />
        <span className="text-small font-medium">{authorName}</span> {/* Display authorName */}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button
            onClick={handleLogout}
            className="dropdown-item"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
