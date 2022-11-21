import React from "react";
import "./styles/RecipeSearch.css";
import recipeLeft from "../images/recipeLeft.png";
import recipeMiddle from "../images/recipeMiddle.png";
import recipeRight from "../images/recipeRight.png";
import NavBar from "./NavBar";

function renderContent() {
  return (
    <div className="wholepagetwo">
      <div className="containertwo">
        <form
          action="https://www.google.com/search"
          method="get"
          className="searchbartwo"
          target="_blank"
        >
          <input
            type="text"
            className="searchbarText"
            placeholder="Search the Best Recipes for you!"
          />
          <button type="submit"></button>
        </form>
        <div className="imagescollecttwo">
          <div className="padtwo">
            <img src={recipeLeft} />
            <a href="#">Toast with eggs and avocado</a>
          </div>
          <div className="padtwo">
            <img src={recipeMiddle} />
            <a href="#">Trail Mix</a>
          </div>
          <div className="padtwo">
            <img src={recipeRight} />
            <a href="#">Lox and cream cheese on Toast</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeSearch() {
  return (
    <div className="container-fluid main-page">
      <div className="row">
        <div className="col-2 nav-bar">
          <NavBar selected={"recipe"} />
        </div>
        <div className="col-10 main-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default RecipeSearch;
