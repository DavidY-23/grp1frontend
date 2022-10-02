import React, { useState, useEffect } from "react";
import "./styles/RecipeSearch.css"
import recipeLeft from '../images/recipeLeft.png';
import recipeMiddle from '../images/recipeMiddle.png';
import recipeRight from '../images/recipeRight.png';

function RecipeSearch() {
    const [api, setapi] = useState(null);
    // const APP_ID = "1835a421";
    // const APP_KEY = "af382678c70f9ed773f2eb9c921ba7ae";

    //Loading API data
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
            .then(res => res.json())
            .then(result => {
                setapi(result); //Storing API in our own variable
                console.log(result);
                console.log(api);
            })
    }, []);
    console.log(api);

    return (
        <div className="wholepagetwo">
            <div className="containertwo">
                <form action="https://www.google.com/search" method="get" className="searchbartwo" target="_blank">
                    <input type="text" className='searchbarText' placeholder="Search the Best Recipes for you!" />
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

export default RecipeSearch;