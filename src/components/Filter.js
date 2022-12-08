import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Filter.css"
import { setRef } from "@mui/material";
import db from './firebase.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

function Filter(props) {
    const [collection_array, set_collection_array] = useState(props.data);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.ingredient_names.length === 0) {
            collectData();
        }
        // setdata(data.sort()) //Putting data in alphabetical order
    }, []);

    // const LoginRefresh = () => {
    //     //In case the user logs in
    //     for (let i = 0; i < props.ingredient_names.length; i++) {
    //         for (let j = 0; j < props.filters.length; j++) {
    //             if (props.ingredient_names[i] === props.filters[j].ingredient) {
    //                 // addToFilter(props.filters[j].ingredient, props.filters[j].index);
    //                 // DeleteFilter(props.filters[j].ingredient, j, props.filters[j].index);
    //                 console.log(props.filters[j])
    //                 let replace = props.ingredient_names;
    //                 replace[i] = "FILTERED " + props.filters[j].ingredient;
    //                 console.log(replace)
    //                 props.set_ingredient_names(replace);
    //                 console.log(props.ingredient_names)
    //             }
    //         }
    //     }
    // }

    const collectData = () => {
        let temporary_ingred_array = [];
        for (let i = 0; i < collection_array.length; i++) {
            let current_index = collection_array[i].ingredients; //Array of ingredients for current index
            for (let j = 0; j < current_index.length; j++) {
                temporary_ingred_array.push(current_index[j])
                // set_ingredient_names((prevArray => [...prevArray, current_index[j]]))
            }
        }
        ///////////
        // temporary_ingred_array = temporary_ingred_array.map(element => {
        //     return element.toLowerCase(); 
        // })
        // temporary_ingred_array = [...new Set(temporary_ingred_array)]
        // for (let i = 0; i < temporary_ingred_array.length; i++) {
        //     let s = temporary_ingred_array[i] + "s";
        //     // console.log(s)
        //     if (temporary_ingred_array.includes(s)) {
        //         console.log(temporary_ingred_array[i])
        //         console.log("FILTER THIS WORD: " + s);  
        //     }

        // } 
        //////////
        let lower_case = temporary_ingred_array.map(element => {
            return element.toLowerCase();
        })
        console.log(lower_case)
        let removeDuplicates = [...new Set(lower_case)];
        removeDuplicates = removeDuplicates.sort();
        console.log(removeDuplicates)
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
        // removeDuplicates.splice(44, 1); //removes the elmeent that has blackberrys since it is mispelt
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
    // const onReturn = () => {
    //     navigate('/home/recipesearch')
    // }

    const onReturn = async () => {
        try {
            await setDoc(doc(db, "Users", props.userID), {
                uniqueId: props.userID,
                firstName: props.firstName,
                lastName: props.lastName,
                age: props.age,
                gender: props.gender,
                weight: props.weight,
                height: props.height,
                allergies: props.allergies,
                injury: props.injury,
                filters: props.filters,
                ingredient_names: props.ingredient_names,
                ingredients_to_avoid: props.ingredients_to_avoid,
                filter_check: props.filter_check,
                allergy_check: props.allergy_check,
                part_checks: props.part_checks,
            });
        }
        catch (error) {
            console.log(error.code + error.message);
            alert(error.message);
        }
        navigate('/home/recipesearch');
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
            <div className="return-to-search-button-from-filter"><button type="button" onClick={onReturn} class="btn btn-success">Return</button></div>
        </div>
    )
}
export default Filter