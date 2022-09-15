import React from 'react';
import ReactDOM from 'react-dom/client'
import "./styles/ExerciseSearch.css"
import { Routes, Route } from "react-router-dom";

function ExceriseSearch() {
    return (
        <div id="wholeComponet">
            <div>
                <form action="https:/httpbin.org/get" method="get">
                    <input id="SearchBar" type="text" placeholder="Search for exercises best suited for you!"></input> 
                </form>
            </div>
        </div>
    );
}

export default ExceriseSearch;