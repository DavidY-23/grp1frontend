import React, { useState, useEffect } from 'react';
import "./styles/ExerciseSearch.css"
import armsPic from '../images/Arms.png';
import legsPic from '../images/legs.png';
import { useNavigate } from "react-router-dom";
import ListEx from './ListEx';


function ExerciseSearch(props) {
    const navigate = useNavigate();
    const [exercises, setexercises] = useState([])

    useEffect(() => {
        exercisesAvailable();
        // Checks();
        //It is better to leave them all unchecked, if everything is unchecked, display all exercises, if one is checked, focus on that part
    }, []);

    const exercisesAvailable = () => {
        let array = ["Arms", "Legs", "Back", "Chest"];
        let true_array = [];
        for (let i = 0; i < array.length; i++) {
            if (props.injury.includes(array[i]) === false) {
                true_array.push(array[i])
            }
        }
        setexercises(true_array);
    }

    // const Checks = () => {
    //     for (let i = 0; i < exercises.length; i++) {
    //         document.getElementById(exercises[i]).checked = true;
    //     }
    //     // document.getElementById("Legs").checked = true;
    // }

    let exerciseCreate = () => {
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

    let filterCheck = () => {
        if (document.getElementById("inj").checked === true) {
            if (props.injury.includes("Arms")) {
                console.log(document.getElementById("arms").disabled === true)
            }
        }
    };
    console.log(props)
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
                        (<ListEx exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID} input={inputText} />) : (<p />)
                    }
                </div>
                <div className="imagescollect">
                    <div className="pad">
                        <img src={armsPic} alt="oops" />
                        <a href="https://vast-teal-ostrich-ring.cyclic.app/arms">Arms</a>
                    </div>
                    <div className="pad">
                        <img src={legsPic} alt="oops" />
                        <a href="https://vast-teal-ostrich-ring.cyclic.app/legs">Legs</a>
                    </div>
                    <div className="pad">
                        <a href="https://vast-teal-ostrich-ring.cyclic.app">And Much More</a>
                    </div>
                </div>
            </div>
            <div className="ex-button"> <button type="button" onClick={exerciseCreate} class="btn btn-warning">Share your Exercise</button> </div>
            <div className='partslabel'>Search by parts:</div>
            <div className="checkboxes">
                {/* <input onChange={filterCheck} type="checkbox" class="form-check-input" id="inj" />
                <label class="form-check-label" for="inj"> <p class="text-white bg-dark">Filter by Injury</p></label> */}
                <br />
                <ul>
                    {
                        exercises.map((element, index) => {
                            return (
                                <div>
                                    <input onChange={filterCheck} type="checkbox" class="form-check-input" id={element} />
                                    <label class="form-check-label" for="part"><p class="text-white bg-dark">{element}</p></label>
                                </div>
                            )
                        })
                    }
                </ul>
                {/* <input onChange={filterCheck} type="checkbox" class="form-check-input" id="arms" />
                <label disabled={true} class="form-check-label" for="arms"> <p class="text-white bg-dark">Arms</p></label>
                <br />
                <input onChange={filterCheck} type="checkbox" class="form-check-input" id="legs" />
                <label class="form-check-label" for="legs"> <p class="text-white bg-dark">Legs</p></label>
                <br />
                <input onChange={filterCheck} type="checkbox" class="form-check-input" id="chest" />
                <label class="form-check-label" for="chest"> <p class="text-white bg-dark">Chest</p></label>
                <br />
                <input onChange={filterCheck} type="checkbox" class="form-check-input" id="back_" />
                <label class="form-check-label" for="back_"> <p class="text-white bg-dark">Back</p></label> */}
            </div>
        </div>
    );

}

export default ExerciseSearch;