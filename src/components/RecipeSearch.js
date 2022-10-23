import React, { useState } from "react";
import "./styles/RecipeSearch.css"
import recipeLeft from '../images/recipeLeft.png';
import recipeMiddle from '../images/recipeMiddle.png';
import recipeRight from '../images/recipeRight.png';
import List from "./List";
import { useNavigate } from "react-router-dom";

function RecipeSearch() {
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);

        setSearch(e.target.value);
    };

    let handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            navigate('/home/recipesearch/SearchResults', { state: { searchName: search} });
        }
    };

    return (
        <div className="wholepagetwo">
            <div className="containertwo">
                {/* <form action="https://www.google.com/search" method="get" className="searchbartwo" target="_blank">
                    <input type="text" className='searchbarText' placeholder="Search the Best Recipes for you!" />
                    <button type="submit"></button>
                </form> */}
                {/* <div className="search3"> */}
                <div className="searchbartwo">
                    {/* <input type="text" id="searchBar3" onChange={inputHandler} /> */}
                    <input type="text" className='searchbarText' placeholder="Search the Best Recipes for you!" onChange={inputHandler} onKeyDown={handleKeyDown}/>
                    { (inputText !== "") ? 
                        (<List input={inputText} />) : (<h2/>)
                    }
                </div>
                
                <div className="imagescollecttwo">
                    <div className="padtwo">
                        <img src={recipeLeft} alt=""/>
                        <a href="https://feelgoodfoodie.net/recipe/avocado-toast-with-egg-3-ways/">Toast with eggs and avocado</a>
                    </div>
                    <div className="padtwo">
                        <img src={recipeMiddle} alt=""/>
                        <a href="https://therecipecritic.com/trail-mix/">Trail Mix</a>
                    </div>
                    <div className="padtwo">
                        <img src={recipeRight} alt=""/>
                        <a href="https://thefeedfeed.com/dieteticaesthetic/cream-cheese-lox-toast">Lox and cream cheese on Toast</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeSearch;