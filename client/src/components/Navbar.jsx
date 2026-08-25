import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logor.png";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowDropdown(false);

    alert("Logout successful 👋");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      id="navbar"
    >
      <div className="container">

        {/* Logo */}
        <NavLink
          to="/"
          className="navbar-brand col-md-1"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-100"
            style={{ height: "50px" }}
          />
        </NavLink>

        {/* Mobile button */}
        <button
          className="navbar-toggler bg-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Home */}
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link text-white"
                style={{
                  fontFamily: "Lucida Handwriting, cursive",
                }}
              >
                Home
              </NavLink>
            </li>

            {/* Upload - only logged in */}
            {user && (
              <li className="nav-item">
                <NavLink
                  to="/upload"
                  className="nav-link text-white"
                  style={{
                    fontFamily: "Lucida Handwriting, cursive",
                  }}
                >
                  Upload Song
                </NavLink>
              </li>
            )}

            {/* Features */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white"
                style={{
                  fontFamily: "Lucida Handwriting, cursive",
                }}
              >
                Features
              </a>
            </li>

            {/* Albums */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white"
                style={{
                  fontFamily: "Lucida Handwriting, cursive",
                }}
              >
                Albums
              </a>
            </li>

            {/* About */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white"
                style={{
                  fontFamily: "Lucida Handwriting, cursive",
                }}
              >
                About
              </a>
            </li>

            {/* Logged out */}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link text-white"
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link text-warning"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {/* Logged in */}
            {user && (
              <li className="nav-item dropdown">

                {/* User button */}
                <button
                  className="btn btn-link nav-link text-warning dropdown-toggle"
                  onClick={() =>
                    setShowDropdown(!showDropdown)
                  }
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Hi, {user.name}
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div
                    className="dropdown-menu show"
                    style={{
                      right: 0,
                      left: "auto",
                      position: "absolute",
                      minWidth: "180px",
                    }}
                  >

                    <div className="px-3 py-2">
                      <strong>{user.name}</strong>
                      <br />
                      <small className="text-muted">
                        {user.email}
                      </small>
                    </div>

                    <hr className="dropdown-divider" />

                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/");
                      }}
                    >
                      🏠 Home
                    </button>

                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/upload");
                      }}
                    >
                      🎵 Upload Song
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                      setShowDropdown(false);
                      navigate("/my-uploads");
                      }}
                    >
                      🎵 My Uploads
                    </button>
                    <button
  className="dropdown-item"
  onClick={() => {
    setShowDropdown(false);
    navigate("/my-playlists");
  }}
>
  🎵 My Playlists
</button>

                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}

              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;