import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Filter.css"
import db from './firebase.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { setRef } from "@mui/material";

function Filter(props) {
    const [data, setdata] = useState([]);

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
        for (let i = 0; i < collection_array.length; i++) {
            let current_index = collection_array[i].ingredients; //Array of ingredients for current index
            for (let j = 0; j < current_index.length; j++) {
                temporary_ingred_array.push(current_index[j])
                // set_ingredient_names((prevArray => [...prevArray, current_index[j]]))
            }
        }
        let lower_case = temporary_ingred_array.map(element => {
            return element.toLowerCase();
        })
        console.log(lower_case)
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
        removeDuplicates.splice(2, 1); //removes the element that has allspice in one word
        removeDuplicates.splice(44, 1); //removes the elmeent that has blackberrys since it is mispelt
        props.set_ingredient_names(removeDuplicates);
        console.log(removeDuplicates);
    }

    const addToFilter = (element, index) => {
        if (element.includes('FILTERED')) {
            return;
        }
        let new_array = [];
        props.setFilter((prevArray => [...prevArray, { ingredient: element, index: index }]));
        new_array = [...props.ingredient_names];
        new_array[index] = "FILTERED: " + element;
        console.log(new_array[index] + " Removed")
        props.set_ingredient_names(new_array);
        console.log(props.filters)
    }

    const DeleteFilter = (element, index, filterlist_index) => {
        let new_array = [];
        let old_ingredient_list = props.ingredient_names;
        for (let i = 0; i < props.filters.length; i++) {
            if (i === index) {
                continue;
            }
            else {
                new_array.push(props.filters[i]);
            }
        }
        old_ingredient_list[filterlist_index] = element; 
        props.set_ingredient_names(old_ingredient_list);
        props.setFilter(new_array);
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
        console.log(filter)
    }
    return (
        <div>
            <input type="text" onChange={inputFilter} id='user_text' className="user_text" placeholder="Search for ingredients.." title="Type in a name" />
            <form>
                <div className="filter-box">
                    <h4 className="filter-text">Filters Added</h4>
                    <ul>
                        {
                            props.filters.map((filter_element, index_of) => {
                                return (
                                    <div>
                                        <li key={index_of}>{filter_element.ingredient}
                                            <button type="button" className="x-button" onClick={() => DeleteFilter(filter_element.ingredient, index_of, filter_element.index)}>x</button>
                                        </li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </form>
            <ul id="ingredient_listing" className="ingredient_listing">
                {
                    props.ingredient_names.map((ingredients, index) => {
                        return (
                            <li>
                                <a className="elements" onClick={() => addToFilter(ingredients, index)}>{ingredients}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Filter