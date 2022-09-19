import React from 'react';
import ReactDOM from 'react-dom/client'
import "./styles/ExerciseSearch.css"
import { Routes, Route } from "react-router-dom";
import armsPic from '../images/Arms.png';
import legsPic from '../images/legs.png';

function ExceriseSearch() {
    return (
        <div id="wholeComponet">
            <div id="surrounding">
                <form action="https:/httpbin.org/get" method="get">
                    <input id="SearchBar" type="text" placeholder="Search for exercises best suited for you!"></input> 
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
                    <img src={armsPic} height="150" width="150"/>
                    <a href="#">Arms</a>
                </div>
                <div class="pad">
                    <img src={legsPic} height="150" width="150"/>
                    <a href="#">Legs</a>
                </div>
                <div class="pad">
                    <a href="#">And Much More</a>
                </div>

            </div>
        </div>
    );
}

export default ExceriseSearch;