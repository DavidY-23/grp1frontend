import React, { useState } from 'react';
// import data from "./ListData.json"
import newData from "./JSON files/recipelist.json";
import ModifiedList from "./JSON files/ModifiedRecipeList.json";

function ParseR(props) {
    let recipe_data = [];
    for (let i = 0; i < ModifiedList.length; i++) {
        let ingredient_list = [];
        let measurement_list = [];
        //Gathering Ingredients/////////////////////////
        ingredient_list.push(newData[i].strIngredient1);
        ingredient_list.push(newData[i].strIngredient2);
        ingredient_list.push(newData[i].strIngredient3);
        ingredient_list.push(newData[i].strIngredient4);
        ingredient_list.push(newData[i].strIngredient5);
        ingredient_list.push(newData[i].strIngredient6);
        ingredient_list.push(newData[i].strIngredient7);
        ingredient_list.push(newData[i].strIngredient8);
        ingredient_list.push(newData[i].strIngredient9);
        ingredient_list.push(newData[i].strIngredient10);
        ingredient_list.push(newData[i].strIngredient11);
        ingredient_list.push(newData[i].strIngredient12);
        ingredient_list.push(newData[i].strIngredient13);
        ingredient_list.push(newData[i].strIngredient14);
        ingredient_list.push(newData[i].strIngredient15);
        ingredient_list.push(newData[i].strIngredient16);
        ingredient_list.push(newData[i].strIngredient17);
        ingredient_list.push(newData[i].strIngredient18);
        ingredient_list.push(newData[i].strIngredient19);
        ingredient_list.push(newData[i].strIngredient20);
        // console.log(ingredient_list);
        /////////////////////////////////////////////////
        for (let j = 0; j < 20; j++) {
            if (ingredient_list[j] === "") {
                ingredient_list.length = j; //After "" is found, cut off the rest of the array
            }
        }
        // console.log(ingredient_list);

        //Gathering Measurements//////////////////////////
        measurement_list.push(newData[i].strMeasure1);
        measurement_list.push(newData[i].strMeasure2);
        measurement_list.push(newData[i].strMeasure3);
        measurement_list.push(newData[i].strMeasure4);
        measurement_list.push(newData[i].strMeasure5);
        measurement_list.push(newData[i].strMeasure6);
        measurement_list.push(newData[i].strMeasure7);
        measurement_list.push(newData[i].strMeasure8);
        measurement_list.push(newData[i].strMeasure9);
        measurement_list.push(newData[i].strMeasure10);
        measurement_list.push(newData[i].strMeasure11);
        measurement_list.push(newData[i].strMeasure12);
        measurement_list.push(newData[i].strMeasure13);
        measurement_list.push(newData[i].strMeasure14);
        measurement_list.push(newData[i].strMeasure15);
        measurement_list.push(newData[i].strMeasure16);
        measurement_list.push(newData[i].strMeasure17);
        measurement_list.push(newData[i].strMeasure18);
        measurement_list.push(newData[i].strMeasure19);
        measurement_list.push(newData[i].strMeasure20);
        //////////////////////////////////////////////////
        for (let j = 0; j < 20; j++) {
            if (measurement_list[j] === "") {
                measurement_list.length = j; //After "" is found, cut off the rest of the array
            }
        }
        // //Converting array back to a string for ingredients
        // for (let j = 0; j < ingredient_list.length; j++) {
        //     stringify_ingredients += ingredient_list[j] + ','
        // }
        // // console.log(stringify_ingredients);

        // //Converting array back to a string for measurements
        // for (let j = 0; j < measurement_list.length; j++) {
        //     stringify_measurements += measurement_list[j] + ','
        // }
        let new_object =
        {
            name: ModifiedList[i].strMeal,
            image: ModifiedList[i].strMealThumb,
            youtube: ModifiedList[i].strYoutube,
            area: ModifiedList[i].strArea,
            instructions: ModifiedList[i].strInstructions,
            tags: ModifiedList[i].strTags,
            ingredients: ingredient_list,
            measurements: measurement_list,
        }
        // console.log(new_object);
        recipe_data.push(new_object);
    }
    console.log(recipe_data)
    //console.log(newData);
    const inde = 22;

    //Formatting tags
    let t = recipe_data[inde].tags;
    let formatted_tags = '"' + t.join('","') + '"';

    //Formatting ingredients array
    let ing = recipe_data[inde].ingredients;
    let formatted_ingredients = '"' + ing.join('","') + '"';
    // console.log(formatted_ingredients);

    //Formatting measurements array
    let mes = recipe_data[inde].measurements;
    let formatted_measurements = '"' + mes.join('","') + '"';

    let left_bracket = '{';
    let right_bracket = '},';


    return (
        <div>
            {
                recipe_data.map((recipe) => {
                    return (
                        <div>
                            <span>{left_bracket}</span> <br />
                            <span>"name": "{recipe.name}",</span> <br />
                            <span>"image": "{recipe.image}",</span> <br />
                            <span>"youtube": "{recipe.youtube}",</span> <br />
                            <span>"area": "{recipe.area}",</span> <br />
                            <span>"instructions": "{recipe.instructions}",</span> <br />
                            <span>"tags": [{formatted_tags}],</span> <br />
                            <span>"ingredients": [{formatted_ingredients}],</span><br />
                            <span>"measurements": [{formatted_measurements}]</span><br />
                            <span>{right_bracket}</span><br />
                        </div>
                    )
                })
            }
        </div>
        // <div>
        //     <span>{left_bracket}</span><br />
        //     <span>"name": "{recipe_data[inde].name}",</span> <br />
        //     <span>"image": "{recipe_data[inde].image}",</span> <br />
        //     <span>"youtube": "{recipe_data[inde].youtube}",</span> <br />
        //     <span>"area": "{recipe_data[inde].area}",</span> <br />
        //     <span>"instructions": "{recipe_data[inde].instructions}",</span> <br />
        //     <span>"tags": [{formatted_tags}],</span> <br />
        //     <span>"ingredients": [{formatted_ingredients}],</span><br />
        //     {/* <span>"ingredients": ["{newData[inde].strIngredient1}", "{newData[inde].strIngredient2}", "{newData[inde].strIngredient3}", "{newData[inde].strIngredient4}", "{newData[inde].strIngredient5}", "{newData[inde].strIngredient6}", "{newData[inde].strIngredient7}", "{newData[inde].strIngredient8}", "{newData[inde].strIngredient9}", "{newData[inde].strIngredient10}", "{newData[inde].strIngredient11}", "{newData[inde].strIngredient12}", "{newData[inde].strIngredient13}", "{newData[inde].strIngredient14}", "{newData[inde].strIngredient15}", "{newData[inde].strIngredient16}", "{newData[inde].strIngredient17}", "{newData[inde].strIngredient18}", "{newData[inde].strIngredient19}", "{newData[inde].strIngredient20}"],</span> <br /> */}
        //     <span>"measurements": [{formatted_measurements}],</span><br />
        //     {/* <span>"measurements": ["{newData[inde].strMeasure1}", "{newData[inde].strMeasure2}", "{newData[inde].strMeasure3}", "{newData[inde].strMeasure4}", "{newData[inde].strMeasure5}", "{newData[inde].strMeasure6}", "{newData[inde].strMeasure7}", "{newData[inde].strMeasure8}", "{newData[inde].strMeasure9}", "{newData[inde].strMeasure10}", "{newData[inde].strMeasure11}", "{newData[inde].strMeasure12}", "{newData[inde].strMeasure13}", "{newData[inde].strMeasure14}", "{newData[inde].strMeasure15}", "{newData[inde].strMeasure16}", "{newData[inde].strMeasure17}", "{newData[inde].strMeasure18}", "{newData[inde].strMeasure19}", "{newData[inde].strMeasure20}"]</span> */}
        //     <span>{right_bracket}</span><br />
        // </div>
    )
}

export default ParseR