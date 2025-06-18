import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h3>Poll & Voting App</h3>
      {user && (
        <div>
          <span>
            Welcome, {user.name} ({user.role})
          </span>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div>
          <Link to="/">Login</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
