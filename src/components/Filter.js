import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Filter.css"
import db from './firebase.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

function Filter() {
    const [data, setdata] = useState([]);
    const [ingredient_names, set_ingredient_names] = useState([]);
    useEffect(() => {
        collectData();
        // setdata(data.sort()) //Putting data in alphabetical order
    }, []);

    async function collectData() {
        const RecipeDatabase = await getDocs(collection(db, "Recipes"));
        let collection_array = [];
        let temporary_ingred_array = [];
        RecipeDatabase.forEach((doc) => {
            collection_array.push(doc.data());
        });
        setdata(collection_array);
        for (let i = 0; i < data.length; i++) {
            let current_index = data[i].ingredients; //Array of ingredients for current index
            for (let j = 0; j < current_index.length; j++) {
                temporary_ingred_array.push(current_index[j])
                // set_ingredient_names((prevArray => [...prevArray, current_index[j]]))
            }
        }
        let lower_case = temporary_ingred_array.map(element => {
            return element.toLowerCase();
        })
        let removeDuplicates = [...new Set(lower_case)];
        removeDuplicates = removeDuplicates.sort();
        for (let i = 0; i < removeDuplicates.length; i++) {
            let next_index = removeDuplicates[i + 1];
            let cut_off = null;
            if (i != removeDuplicates.length - 1) {
                cut_off = next_index.slice(0, -1);
            }
            if (removeDuplicates[i] === (cut_off)) {
                removeDuplicates[i + 1] = cut_off;
            }
        }
        removeDuplicates = [...new Set(removeDuplicates)];
        set_ingredient_names(removeDuplicates);
        console.log(removeDuplicates);
    }

    const inputFilter = () => {
        var inputted_value, filter, ul_list, list, a, inputted_text;
        inputted_value = document.getElementById("user_text");
        filter = inputted_value.value.toUpperCase();
        ul_list = document.getElementById("ingredient_listing");
        list = ul_list.getElementsByTagName("li");
        for (let i = 0; i < list.length; i++) {
            a = list[i].getElementsByTagName("a")[0];
            inputted_text = a.textContent || a.innerText;
            if (inputted_text.toUpperCase().indexOf(filter) > -1) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
            }
        }
    }


    return (
        <div>
            <input type="text" onChange={inputFilter} id='user_text' className="user_text" placeholder="Search for ingredients.." title="Type in a name" />
            <ul id="ingredient_listing" className="ingredient_listing">
                <li><a>Edward</a></li>
                <li><a>Joel</a></li>
                <li><a>Eric</a></li>
                <li><a>Anthony</a></li>
                <li><a>Beth</a></li>
            </ul>
        </div>
    )
}
export default Filter