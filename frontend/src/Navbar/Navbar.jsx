import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://images.scalebranding.com/letter-n-abstract-infinite-symbol-logo-design-6a5553bd-0149-4999-8dcd-e89eac342ce2.jpg"
          alt="Logo"
        />
      </div>

      <div className="nav-items">
        <a className="b">Home</a>
        <a className="b">About</a>
        <a className="b">Products</a>
        <a className="b cart-btn">Cart</a>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button className="b">Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
