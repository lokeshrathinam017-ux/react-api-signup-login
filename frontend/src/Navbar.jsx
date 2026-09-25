import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AuraTask</Link>
      </div>
      <div className="navbar-actions">
        <Link to="/login" className="btn btn-secondary">Login</Link>
        <Link to="/signup" className="btn btn-primary">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;