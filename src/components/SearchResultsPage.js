import React, { useState, useEffect, cloneElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import './styles/SearchResultsPage.css'
import { fontSize, sizeHeight } from "@mui/system";
import { useNavigate } from "react-router-dom";


const SearchResults = (props) => {
    const { state } = useLocation();
    const { searchName } = state;
    const navigate = useNavigate();
    const [newSearch, setNewSearch] = useState(searchName);
    const [data, setdata] = useState(props.data);
    // const [collection_array, setcollection_array] = useState(props.data)

    //Gathering API data through our backend 
    useEffect(() => {
        collectData();
    }, []); 

    const collectData = () => {
        console.log(data)
        if (props.allergy_check === true && props.filter_check === true) {
            allergyFilter(data);
        }
        else if (props.allergy_check === true) {
            allergyFilter(data);
        }
        else if (props.filter_check === true) {
            personFilters(data);
        }
    }

    async function personFilters(array) {
        let personal_array = [];
        let ingredients_to_prioritize = [];
        for (let i = 0; i < props.filters.length; i++) {
            ingredients_to_prioritize.push(props.filters[i].ingredient)
        }
        FilterLoop: for (let i = 0; i < array.length; i++) {
            let ingredient_array = array[i].ingredients;
            ingredient_array = ingredient_array.map(ingredients => {
                return ingredients = ingredients.toLowerCase();
            });
            const found = ingredients_to_prioritize.some(r => ingredient_array.includes(r));
            if (found === false) {
                continue FilterLoop;
            }
            else if (found === true) {
                let counter = 0;
                for (let j = 0; j < ingredients_to_prioritize.length; j++) {
                    if (ingredient_array.includes(ingredients_to_prioritize[j])) {
                        counter++;
                    }
                    if (counter === props.filters.length) {
                        personal_array.push(array[i]);
                        console.log(personal_array)
                    }
                }
            }
        }
        setdata(personal_array);
    }

    async function allergyFilter(array) {
        let data_with_allergy_filter = [];
        DataLoop: for (let i = 0; i < array.length; i++) {
            let ingredient_array = array[i].ingredients;
            ingredient_array = ingredient_array.map(ingredients => {
                return ingredients = ingredients.toLowerCase();
            })
            // console.log(ingredient_array);
            if ((ingredient_array.includes("milk")) && (props.ingredients_to_avoid.includes("milk"))) { //.INCLUDES() CHECKS FOR THE EXACT CHARACTER, RETURNS FALSE IF FINDING "MILK" IN "COCONUT MILK"
                continue DataLoop; //Continue to next iteration
            }
            else {
                const found = props.ingredients_to_avoid.some(r => ingredient_array.includes(r));
                // console.log(found);
                if (found === true) {
                    continue DataLoop;
                }
            }
            data_with_allergy_filter.push(array[i]);
        }
        if (props.filter_check === true) {
            personFilters(data_with_allergy_filter);
            return;
        }
        setdata(data_with_allergy_filter)
    }

    let handleInput = (e) => {
        setNewSearch(e.target.value.toLowerCase());
    };

    const filteredData = data.filter((el) => {
        // if no input the return the original
        if (newSearch === '') {
            //return el;
            return '';
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(newSearch);
        }
    })

    const searchBar = () => {
        navigate("/home/recipesearch")
    }

    return (
        <div className="SearchResultsPage">
            <div className="SearchBarSRP">
                <input type="Text" className="SearchBarTextSRP" value={newSearch} onChange={handleInput} />
                {(newSearch !== "") ?
                    (<div className="WrapperSRP">
                        {filteredData.map((item) => (
                            <div key={item.name}>
                                <img src={item.image} alt="" className="PreviewSRP" />
                                <div className="TextWrapperSRP">
                                    <div className="NameWrapperSRP">
                                        <Link
                                            style={{ textDecoration: 'none' }} to={'/home/recipesearch/RecipeDetails/' + item.name.replaceAll(" ", "-")} state={{ name: item.name, yt: item.youtube, image: item.image, instructions: item.instructions, ingredients: item.ingredients, measurements: item.measurements }}>
                                            <span className="NameSRP" id="NameSRP">{item.name}</span>
                                        </Link>
                                    </div> <br />
                                    <div className="IngredientWrapperSRP">
                                        {
                                            item.ingredients.map((ingr) => (
                                                <span className="IngredientSRP">{ingr.toUpperCase()}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>) : (<h2 />)
                }
            </div>
            <div className="return-to-search-button"><button type="button" onClick={searchBar} class="btn btn-success">Return</button></div>
        </div>
    );
};

export default SearchResults;