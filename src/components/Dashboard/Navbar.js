import React, { Component } from "react";
import FOBAQ from "../images/FOBAQ.png";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <img className="logo-img" src={FOBAQ} alt="Logo" />
        </div>
        <div className="name-list">
          <Link className="profile" to="/profile">
            Profile
          </Link>
          <button className="logout-btn">Log out</button>
        </div>
      </div>
    );
  }
}
