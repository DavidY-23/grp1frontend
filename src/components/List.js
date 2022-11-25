import { React, useState, useEffect } from 'react';
// import data from "./JSON files/recipelistAll.json"
import { Link } from 'react-router-dom';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import './styles/SearchResults.css';
import db from './firebase.js';

function List(props) {
    const [data, setdata] = useState([]);
    //Gathering API data through our backend 
    useEffect(() => {
        collectData();
        console.log(data);
    }, []);

    async function collectData() {
        const RecipeDatabase = await getDocs(collection(db, "Recipes"));
        let collection_array = [];
        RecipeDatabase.forEach((doc) => {
            collection_array.push(doc.data());
        });
        if (props.allergy_check === true && props.filter_check === true) {
            allergyFilter(collection_array);
        }
        else if (props.allergy_check === true) {
            allergyFilter(collection_array);
        }
        else if (props.filter_check === true) {
            personFilters(collection_array);
        }
        else {
            setdata(collection_array)
        }
        console.log('COLLECTION CALLED')
    }
    console.log(props);

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

    const filteredData = data.filter((el) => {
        // if no input the return the original
        if (props.input === '') {
            //return el;
            return '';
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul className="SearchWrapper">
            <div >
                {filteredData.map((item) => (
                    <div key={item.name}>
                        <Link to={'/home/recipesearch/RecipeDetails/' + item.name.replaceAll(" ", "-")} state={{ name: item.name, yt: item.youtube, image: item.image, instructions: item.instructions, ingredients: item.ingredients, measurements: item.measurements }}>
                            <button className="searchResults">{item.name}</button>
                            {/* <hr className="borderBottom"/> */}
                        </Link><br />
                    </div>
                ))}
            </div>
        </ul>
    )
}

export default List