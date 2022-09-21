import React from "react";
import "./styles/RecipeSearch.css"
import recipeLeft from '../images/recipeLeft.png';
import recipeMiddle from '../images/recipeMiddle.png';
import recipeRight from '../images/recipeRight.png';

function RecipeSearch() {
    return (
        <div id="wholeComponet">
            <div class="container">
                <form action="https://www.google.com/search" method="get" class="searchbar" target="_blank">
                    <input type="text" placeholder="Search the Best Recipes for you!" />
                    <button type="submit"></button>
                </form>
            </div> 
        </div>
    );
}

export default RecipeSearch;