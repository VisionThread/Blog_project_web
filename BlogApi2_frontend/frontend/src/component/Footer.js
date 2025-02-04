import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-green-700 py--3 mt-8 shadow-lg">
      <div className="container mx-auto text-center space-y-2">
        <h3 className="text-2xl font-semibold text-white">InkSpire Blog</h3>
        <p className="text-lg text-emerald-200">Sharing insights, ideas, and inspiration</p>
        <div className="flex justify-center space-x-6">
          <FooterLink to="#">Facebook</FooterLink>
          <FooterLink to="#">Twitter</FooterLink>
          <FooterLink to="#">Instagram</FooterLink>
        </div>
        <p className="text-sm text-emerald-200">&copy; 2025 InkSpire. All rights reserved.</p>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => {
  return (
    <a
      href={to}
      className="text-emerald-100 hover:text-white transition-colors duration-300 transform hover:scale-105"
    >
      {children}
    </a>
  );
};

export default Footer;
