import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-title">InkSpire Blog</h3>
        <p className="footer-description">Sharing insights, ideas, and inspiration</p>
        <div className="footer-links">
          <FooterLink to="#">Facebook</FooterLink>
          <FooterLink to="#">Twitter</FooterLink>
          <FooterLink to="#">Instagram</FooterLink>
        </div>
        <p className="footer-text">&copy; 2025 InkSpire. All rights reserved.</p>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => {
  return (
    <a
      href={to}
      className="footer-link"
    >
      {children}
    </a>
  );
};

export default Footer;
