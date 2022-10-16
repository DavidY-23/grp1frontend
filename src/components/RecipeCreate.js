import "./styles/FirstTimeLogin.css";
import React, { useState, useEffect } from "react";
import CopyRecipeList from './recipelistAll.json'
import './styles/RecipeCreate.css'
import { useNavigate } from "react-router-dom";

function RecipeCreate() {
    const [ingredients_list, setingredients_list] = useState([]);
    const [tag_list, settag_list] = useState([]);
    const [measurement_list, setmeasurement_list] = useState([]);
    const [name, setname] = useState('');
    const [image, setImage] = useState('');
    const [youtube, setyoutube] = useState(''); //this can be null
    const [area, setarea] = useState('');
    const [instructions, setinstructions] = useState('');
    const [tags, setTag] = useState('');
    const [ingredients, setingredients] = useState('');
    const [measurements, setmeasurements] = useState('');
    const [api, setapi] = useState([]);
    const [ingred_and_measure, setingred_and_measure] = useState([]);
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const range = alphabet.length;
    const copy_of_recipe = CopyRecipeList;

    //Loading API data
    useEffect(() => {
        apiCall(); //Calling API function
        console.log(ingred_and_measure);
    }, []);

    const apiCall = async () => {
        for (let i = 0; i < range; i++) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet[i]}`) //looping through all meals a-z
            const json = await response.json(); //Gathering data from API call
            if (json.meals == null) {
                continue;
            }
            else {
                for (let j = 0; j < json.meals.length; j++) {
                    setapi(prevArray => [...prevArray, json.meals[j]]); //Appending value to the end of state array
                }
            }
        }
    }

    //Function for removing values that are "" or null in json file
    const RemoveEmpty = () => {
        for (let i = 0; i < api.length; i++) {
            const value = api[i];
            Object.keys(value).forEach(key => {
                if (value[key] === null || value[key] === "") {
                    delete value[key];
                }
            });
        }
    }

    const SeperateStrings = () => {
        for (let i = 0; i < api.length; i++) {
            if (api[i].strTags != null || api[i].strTags != undefined) {
                const string = api[i].strTags + '';
                const split_string = string.split(",");
                api[i].strTags = split_string;
            }
        }
    }
    //Removing Empty values, and fixing values where the lists are strings
    RemoveEmpty();
    SeperateStrings();
    // console.log(api);

    // console.log(api[0].strTags); //Output "Tart,Baking,Fruity"
    //Converting array of objects to JSON file

    var myJsonString = JSON.stringify(api);
    // console.log(myJsonString);

    const addTag = () => {
        if (!tags.trim().length || !tags) {
            alert("Please do not leave only whitespace or an empty value");
            return;
        }
        settag_list((prevArray => [...prevArray, tags]));
        setTag('');
        console.log(tag_list);
    }

    const AddIngredients = () => {
        if (!ingredients.trim().length || !ingredients) {
            alert("Please do not leave only whitespace or an empty value");
            return;
        }
        setingredients_list(prevArray => [...prevArray, ingredients]);
        setingredients('');
        if (measurement_list.length === ingredients_list.length && (measurement_list.length && ingredients_list.length) !== 0) {
            console.log("Testing")
            setingred_and_measure(old => [...old, measurement_list[measurement_list.length - 1] + " " + ingredients_list[ingredients_list.length - 1]]);
        }
    }

    const AddMeasurements = () => {
        if (!measurements.trim().length || !measurements) {
            alert("Please do not leave only whitespace or an empty value");
            return;
        }
        setmeasurement_list((prevArray => [...prevArray, measurements]));//Pushing measurement in measurement array
        setmeasurements('');
        if (measurement_list.length === ingredients_list.length && (measurement_list.length && ingredients_list.length) !== 0) {
            console.log("Testing")
            setingred_and_measure(old => [...old, measurement_list[measurement_list.length - 1] + " " + ingredients_list[ingredients_list.length - 1]]);
            console.log(ingred_and_measure)
        }
    }

    const addBoth = () => {
        if ((!measurements.trim().length || !measurements) || (!ingredients.trim().length || !ingredients)) {
            alert("Please do not leave only whitespace or an empty value");
            return;
        }
        setingredients_list(prevArray => [...prevArray, ingredients]);
        setmeasurement_list((prevArray => [...prevArray, measurements]));//Pushing measurement in measurement array
        setingred_and_measure((prevArray => [...prevArray, measurements + " " + ingredients]));
        setmeasurements('');
        setingredients('');
    }

    //After button press, perform this submission:
    const SubmitRecipe = async (event) => {
        event.preventDefault();
        let recipe_object =
        {
            name: name,
            image: image,
            youtube: null,
            area: area,
            instructions: instructions,
            tags: tag_list,
            ingredients: ingredients_list,
            measurements: measurement_list,
        }
        copy_of_recipe.push(recipe_object);
        console.log(copy_of_recipe);
        setname('');
        setImage('');
        setarea('');
        setinstructions('');
    }


    // onChange={(e) => setingredients(prevArray => [...prevArray, e.target.value])}
    return (
        <div>
            <form className="container mt-5 mb-5 d-flex justify-content-center" onSubmit={SubmitRecipe}>
                <div>
                    <label className="recipe-name">Recipe Name
                        <input className="recipe-box" type="text" placeholder="Name of Meal" value={name} onChange={(e) => setname(e.target.value)}></input>
                    </label><br />
                    <label className="imagelink-name">Image Link
                        <input placeholder="Image URL" className="image-box" type="text" value={image} onChange={(e) => setImage(e.target.value)}></input>
                    </label> <br />
                    <label>Origin of meal
                        <input type="text" placeholder="Origin Location" value={area} onChange={(e) => setarea(e.target.value)}></input>
                    </label><br />
                    <label>Tag(s)
                        <input type="text" placeholder="Meal Tag" value={tags} onChange={(e) => setTag(e.target.value)}></input>
                    </label>
                    <button className="tag-button" type='button' onClick={addTag}>Add Tag </button><br />
                    <label>Ingredient
                        <input type="text" value={ingredients} placeholder="Ingredient" onChange={(e) => setingredients(e.target.value)}></input>
                        {/* <button type="button" onClick={AddIngredients}>Add Ingredient</button><br /> */}
                    </label>
                    <label>Measurement
                        <input type="text" value={measurements} placeholder="Measurement" onChange={(e) => setmeasurements(e.target.value)}></input>
                    </label>
                    {/* <button type='button' onClick={AddMeasurements}>Add Measurement </button><br /> */}
                    <button type='button' className="ing-meas-button" onClick={addBoth}>Add Ingredient w/ Measurement</button>

                    <label>Instructions
                        <textarea className="text-input" type="text" value={instructions} placeholder="Instructions" onChange={(e) => setinstructions(e.target.value)}></textarea>
                    </label><br />
                    <br />
                    <br />
                    <button className="submit-button">Submit Recipe</button>
                </div>
            </form>
            <form>
                <h3>Current Tags added</h3>
                <ul>
                    {
                        tag_list.map((tags, i) => {
                            return (
                                <li key={i}>{tags}</li>
                            )
                        })
                    }
                </ul>
                <h3>Current Ingredients added</h3>
                <ul>
                    {
                        ingredients_list.map((ingredients, i) => {
                            return (
                                <li key={i}>{ingredients}</li>
                            )
                        })
                    }
                </ul>
                <h3>Current Measurements added</h3>
                <ul>
                    {
                        measurement_list.map((measurements, i) => {
                            return (
                                <li key={i}>{measurements}</li>
                            )
                        })
                    }
                </ul>
                <h3>Ingredients Along with Measurements</h3>
                <ul>
                    {
                        ingred_and_measure.map((both, i) => {
                            return (
                                <li key={i}>{both}</li>
                            )
                        })
                    }
                </ul>
            </form>
        </div>

    );
}

export default RecipeCreate;