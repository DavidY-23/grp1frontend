import React from "react";
import "./styles/RecipeSearch.css"
import recipeLeft from '../images/recipeLeft.png';
import recipeMiddle from '../images/recipeMiddle.png';
import recipeRight from '../images/recipeRight.png';

function RecipeSearch() {
    return (
        <div className="wholepagetwo">
            <div className="containertwo">
                <form action="https://www.google.com/search" method="get" className="searchbartwo" target="_blank">
                    <input type="text" placeholder="Search for Exercises Best Suited for you!" />
                    <button type="submit"></button>
                </form>
            </div>           
        </div>
    );
}

export default RecipeSearch;