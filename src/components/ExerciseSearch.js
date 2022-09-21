import React from 'react';
import ReactDOM from 'react-dom/client'
import "./styles/ExerciseSearch.css"
import { Routes, Route } from "react-router-dom";
import armsPic from '../images/Arms.png';
import legsPic from '../images/legs.png';

function ExceriseSearch() {
    return (
        <div id="wholepage">
            <div class="container">
                <form action="https://www.google.com/search" method="get" class="searchbar" target="_blank">
                    <input type="text" placeholder="Search for Exercises Best Suited for you!" />
                    <button type="submit"></button>
                </form>
            </div>  

        </div>
    );
}

export default ExceriseSearch;