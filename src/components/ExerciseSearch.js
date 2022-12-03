import React, { Component } from 'react';
import "./styles/ExerciseSearch.css"
import armsPic from '../images/Arms.png';
import legsPic from '../images/legs.png';
import { useNavigate } from "react-router-dom";

function ExerciseSearch() {
    const navigate = useNavigate();

    let recipeCreate = () => {
        navigate('/ExerciseCreate')
    }

    return (
        <div className="wholepage">
            <div className="contnr">
                <form action="https://www.google.com/search" method="get" className="searchbar" target="_blank">
                    <input type="text" className='searchbarText' placeholder="Search for Exercises Best Suited for you!" />
                    <button type="submit"></button>
                </form>
                <div className="imagescollect">
                    <div className="pad">
                        <img src={armsPic}/>
                        <a href="#">Arms</a>
                    </div>
                    <div className="pad">
                        <img src={legsPic} />
                        <a href="#">Legs</a>
                    </div>
                    <div className="pad">
                        <a href="#">And Much More</a>
                    </div>
                </div>
            </div>
            <div className="ex-button"> <button type="button" onClick={recipeCreate} class="btn btn-warning">Share your Exercise</button> </div>
        </div>
    );
    
}

export default ExerciseSearch;