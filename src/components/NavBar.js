import React from "react";
import "./styles/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

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
        <Link to="/home/recipesearch">
          <div
            className={
              props.selected === "recipesearch" ? "selected-nav-tab" : ""
            }
          >
            Recipe Search
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/exercisesearch">
          <div
            className={
              props.selected === "exercisesearch" ? "selected-nav-tab" : ""
            }
          >
            Exercise Search
          </div>
        </Link>
        <Link to="/home/locator">
          <div
            className={props.selected === "locator" ? "selected-nav-tab" : ""}
          >
            Locator
          </div>
        </Link>
        <Link to="/home/MentalHealth">
          <div
            className={props.selected === "locator" ? "selected-nav-tab" : ""}
          >
            Mental Health
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
