import React from "react";
import "./styles/RecipeSearch.css"
import recipeLeft from '../images/recipeLeft.png';
import recipeMiddle from '../images/recipeMiddle.png';
import recipeRight from '../images/recipeRight.png';

function RecipeSearch() {
    return (
        <div id="wholeComponet">
            <div id="surrounding">
                <form action="https:/httpbin.org/get" method="get">
                    <input id="SearchBar" type="text" placeholder="Search the best recipes for you!"></input> 
                </form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <div id="images">
                <div class="pad">
                    <img src={recipeLeft} height="150" width="150"/>
                    <a href="#">Toast with eggs</a>
                </div>
                <div class="pad">
                    <img src={recipeMiddle} height="150" width="150"/>
                    <a href="#">Trail Mix</a>
                </div>
                <div class="pad" id="singlelink">
                    <img src={recipeRight} height="150" width="150"/>
                    <a href="#">Cream Cheese</a>
                </div>

            </div>
        </div>
    );
}

export default RecipeSearch;