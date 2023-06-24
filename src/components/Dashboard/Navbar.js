import React from "react";
import FOBAQ from "../images/FOBAQ.png";
import { Link, useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../utils";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logo-img" src={FOBAQ} alt="Logo" />
      </div>
      <div className="name-list">
        <Link className="profile" to="/profile">
          Profile
        </Link>
        <button
          className="logout-btn"
          onClick={() => {
            clearLocalStorage();
            navigate("/login");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
