import React, { useState, useEffect } from 'react';
import "./styles/ExerciseSearch.css"
import armsPic from '../images/Arms.png';
import legsPic from '../images/legs.png';
import { useNavigate } from "react-router-dom";
import ListEx from './ListEx';

function ExerciseSearch(props) {
    const navigate = useNavigate();

    let recipeCreate = () => {
        navigate('/ExerciseCreate')
    }

    const [inputText, setInputText] = useState("");
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
        <div className="wholepage">
            <div className="contnr">
                {/* <form action="https://www.google.com/search" method="get" className="searchbar" target="_blank">
                    <input type="text" className='searchbarText' placeholder="Search for Exercises Best Suited for you!" />
                    <button type="submit"></button>
                </form> */}
                <div className="searchbartwo">
                    {/* <input type="text" id="searchBar3" onChange={inputHandler} /> */}
                    <input type="text" className='searchbarText' placeholder="Search the Best Exercises for you!" onChange={inputHandler} onKeyDown={handleKeyDown} />
                    {(inputText !== "") ?
                        (<ListEx exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID} input={inputText} />) : (<p/>)
                    }
                </div>
                <div className="imagescollect">
                    <div className="pad">
                        <img src={armsPic} alt="oops"/>
                        <a href="https://vast-teal-ostrich-ring.cyclic.app/arms">Arms</a>
                    </div>
                    <div className="pad">
                        <img src={legsPic} alt="oops"/>
                        <a href="https://vast-teal-ostrich-ring.cyclic.app/legs">Legs</a>
                    </div>
                    <div className="pad">
                        <a href="https://vast-teal-ostrich-ring.cyclic.app">And Much More</a>
                    </div>
                </div>
            </div>
            <div className="ex-button"> <button type="button" onClick={recipeCreate} class="btn btn-warning">Share your Exercise</button> </div>
        </div>
    );
    
}

export default ExerciseSearch;