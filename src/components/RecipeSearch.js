import React, { useState, useEffect } from "react";
import "./styles/RecipeSearch.css"
import recipeLeft from '../images/recipeLeft.png';
import recipeMiddle from '../images/recipeMiddle.png';
import recipeRight from '../images/recipeRight.png';
import List from "./List";
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";
import db from './firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import Slideshow from "./styles/Carousel/Slideshow";

const randInd1 = Math.floor(Math.random() * 93);
const randInd2 = Math.floor(Math.random() * 93);
const randInd3 = Math.floor(Math.random() * 93);

function RecipeSearchHTML(props) {
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
        if (event.key === 'Enter') {
            navigate('/home/recipesearch/SearchResults', { state: { searchName: search } });
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
                    <input type="text" className='searchbarText' placeholder="Search the Best Recipes for you!" onChange={inputHandler} onKeyDown={handleKeyDown} />
                    {(inputText !== "" || props.filter_check) ?
                        (<List exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID} input={inputText} />) : (<h2 />)
                    }
                </div>

                <div className="imagescollecttwo">
                    <div className="padtwo">
                        {/* <img src={recipeLeft} alt="" />
                        <a href="https://feelgoodfoodie.net/recipe/avocado-toast-with-egg-3-ways/">Toast with eggs and avocado</a> */}
                        <Slideshow lower={0} upper={93} ind1={randInd1} ind2={randInd2} ind3={randInd3}/>

                    </div>
                    <div className="padtwo">
                        {/* <img src={recipeMiddle} alt="" />
                        <a href="https://therecipecritic.com/trail-mix/">Trail Mix</a> */}
                        <Slideshow lower={94} upper={187} ind1={randInd1} ind2={randInd2} ind3={randInd3}/>
                    </div>
                    <div className="padtwo">
                        {/* <img src={recipeRight} alt="" />
                        <a href="https://thefeedfeed.com/dieteticaesthetic/cream-cheese-lox-toast">Lox and cream cheese on Toast</a> */}
                        <Slideshow lower={188} upper={283} ind1={randInd1} ind2={randInd2} ind3={randInd3}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecipeSearch(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.allergies.length !== 0) {
            if (props.allergy_check === true) {
                document.getElementById("allergycheck").checked = true;
                props.set_ingredients_to_avoid([]);
                allergyCheck();
            }
            else if (props.allergy_check === false) {
                document.getElementById("allergycheck").checked = false;
                props.set_ingredients_to_avoid([]);
            }
        }
        if (props.filters.length !== 0) {
            if (props.filter_check === true) {
                document.getElementById("filtercheck").checked = true;
            }
            else if (props.filter_check === false) {
                document.getElementById("filtercheck").checked = false;
            }
        }
    }, []);

    // console.log(props)
    const allergyCheck = () => {
        // If checked...
        // console.log(props.ingredients_to_avoid)
        let allergies = document.getElementById("allergycheck")
        if (allergies.checked === true) {
            props.set_allergycheck(true);
            if (props.allergies.includes("Milk")) {
                let lactose_intolerance = ["milk", "cheese", "butter", "yogurt", "ice cream", "buttermilk", "sour cream", "whipped cream"]
                lactose_intolerance.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, lactose_intolerance]);
            }
            if (props.allergies.includes("Nuts")) {
                let nut_allergy = ["peanut oil", "arachis oil", "nuts", "nut", "peanut", "peanuts", "pine nuts"];
                nut_allergy.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, nut_allergy]);
            }
            if (props.allergies.includes("Eggs")) {
                let egg_allergy = ["egg", "eggs"];
                egg_allergy.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, egg_allergy]);
            }
            if (props.allergies.includes("Fish")) {
                let fish_allergy = ["fish", "anchovies", "bass", "catfish", "cod", "flounder", "grouper", "haddock", "hake", "halibut", "herring", "mahi mahi", "perch", "pike", "pollock", "salmon", "scrod", "sole", "snapper", "swordfish", "tilapia", "trout", "tuna"];
                fish_allergy.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, fish_allergy]);
            }
            if (props.allergies.includes("Wheat")) {
                let wheat_allergy = ["wheat", "whole wheat"];
                wheat_allergy.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, wheat_allergy]);
            }
            if (props.allergies.includes("Shellfish")) {
                let shell_fish_allergy = ["barnacle", "crab", "crawfish", "krill", "lobster", "prawns", "shrimp", "scampi"];
                shell_fish_allergy.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, shell_fish_allergy]);
            }
            if (props.allergies.includes("Soybeans")) {
                let soybean_allergy = ["soy", "soybean"];
                soybean_allergy.forEach((element) => {
                    props.set_ingredients_to_avoid((prevArray) => [...prevArray, element]);
                })
                // props.set_ingredients_to_avoid((prevArray) => [...prevArray, soybean_allergy]);
            }
        }
        else if (allergies.checked === false) {
            props.set_allergycheck(false);
            props.set_ingredients_to_avoid([]); //Clear array
        }
    }
    let filter = () => {
        navigate('/home/filter');
    }

    let recipeCreate = () => {
        navigate('/RecipeCreate')
    }

    const filterCheck = () => {
        // If checked...
        let filters = document.getElementById("filtercheck")
        if (filters.checked === true) {
            props.setfilter_check(true);
        }
        // If not checked...
        else if (filters.checked === false) {
            props.setfilter_check(false);
        }
    }
    // console.log(props)
    if (props.allergies.length === 0 && props.filters.length !== 0) { //If there are no allergies
        return (
            <div>
                <RecipeSearchHTML exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID}
                />
                {/* Applying Filter html */}
                <div className="filter-checkbox">
                    <input onChange={filterCheck} type="checkbox" class="form-check-input" id="filtercheck" />
                    <label class="form-check-label" for="filtercheck"> <p class="text-white bg-dark">Filter Check</p></label>
                </div>
                <div className="filter-button"><button type="button" onClick={filter} class="btn btn-success">Narrow Search</button></div>
                <div className="recipe-create"> <button type="button" onClick={recipeCreate} class="btn btn-warning">Create a Recipe</button> </div>
            </div>
        )
    }
    else if (props.allergies.length !== 0 && props.filters.length === 0) {
        return (
            <div>
                <RecipeSearchHTML exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID}
                />
                <div className="allergy-checkbox">
                    <input onChange={allergyCheck} type="checkbox" class="form-check-input" id="allergycheck" />
                    <label class="form-check-label" for="allergycheck"> <p class="text-white bg-dark">Allergy Filter</p></label>
                </div>
                <div className="filter-button"><button type="button" onClick={filter} class="btn btn-success">Narrow Search</button></div>
                <div className="recipe-create"> <button type="button" onClick={recipeCreate} class="btn btn-warning">Create a Recipe</button> </div>
            </div>
        )
    }
    else if (props.allergies.length === 0 && props.filters.length === 0) {
        return (
            <div>
                <RecipeSearchHTML exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID}
                />
                <div className="filter-button"><button type="button" onClick={filter} class="btn btn-success">Narrow Search</button></div>
                <div className="recipe-create"> <button type="button" onClick={recipeCreate} class="btn btn-warning">Create a Recipe</button> </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <RecipeSearchHTML exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID}
                />
                <div className="allergy-checkbox">
                    <input onChange={allergyCheck} type="checkbox" class="form-check-input" id="allergycheck" />
                    <label class="form-check-label" for="allergycheck"> <p class="text-white bg-dark">Allergy Filter</p></label>
                </div>
                {/* Applying Filter html */}
                <div className="filter-checkbox">
                    <input onChange={filterCheck} type="checkbox" class="form-check-input" id="filtercheck" />
                    <label class="form-check-label" for="filtercheck"> <p class="text-white bg-dark">Apply Filters</p></label>
                </div>
                <div className="filter-button"><button type="button" onClick={filter} class="btn btn-success">Narrow Search</button></div>
                <div className="recipe-create"> <button type="button" onClick={recipeCreate} class="btn btn-warning">Create a Recipe</button> </div>
            </div>
        )
    }

}

export default RecipeSearch;