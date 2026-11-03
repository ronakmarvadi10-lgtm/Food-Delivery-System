
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, cartCount, logout }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">F</span> food<span>zone</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#menu">Menu</a>

        <Link to="/cart">
          Cart <b className="count">{cartCount}</b>
        </Link>

        {user && <Link to="/orders">My Orders</Link>}
      </nav>

      <div className="nav-right">
        {user ? (
          <>
            <Link className="profile-link" to="/profile">
              Hi, {user.name.split(" ")[0]}
            </Link>

            <button
              className="button small outline"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="button small"
            onClick={() => navigate("/login")}
          >
            Login / Sign up
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
