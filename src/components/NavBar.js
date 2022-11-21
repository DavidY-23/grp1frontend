import React from "react";
import "./styles/NavBar.css";
import { Link } from "react-router-dom";

//to do: code clarity can be improved
const NavBar = (props) => {
  return (
    <div className="container-fluid sticky-top side-nav-bar">
      <div className="row">
        <Link to="/home/overview">
          <div
            className={props.selected === "overview" ? "selected-nav-tab" : ""}
          >
            Overview
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/profile">
          <div
            className={props.selected === "profile" ? "selected-nav-tab" : ""}
          >
            Profile
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/recipe">
          <div
            className={props.selected === "recipe" ? "selected-nav-tab" : ""}
          >
            Recipe Search
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/exercise">
          <div
            className={props.selected === "exercise" ? "selected-nav-tab" : ""}
          >
            Exercise Search
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/LoginPage">
          <div>Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
