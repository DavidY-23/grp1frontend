import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/SearchResults.css';
import dict from "./JSON files/ExerciseDictionary.json";
import { distance } from 'fastest-levenshtein';
var PriorityQueue = require('priorityqueuejs');

function ListEx(props) {
    //const [data, setdata] = useState(props.data);
    const [data, setdata] = useState([]);
    useEffect(() => {
        collectData();
    }, []);

    const collectData = () => {
        setdata(props.exercise_data);
    }

    // const collectData = () => {
    //     //console.log(data)
    //     if (props.allergy_check === true && props.filter_check === true) {
    //         allergyFilter(data);
    //     }
    //     else if (props.allergy_check === true) {
    //         allergyFilter(data);
    //     }
    //     else if (props.filter_check === true) {
    //         personFilters(data);
    //     }
    // }

    // async function personFilters(array) {
    //     let personal_array = [];
    //     let ingredients_to_prioritize = [];
    //     for (let i = 0; i < props.filters.length; i++) {
    //         ingredients_to_prioritize.push(props.filters[i].ingredient)
    //     }
    //     FilterLoop: for (let i = 0; i < array.length; i++) {
    //         let ingredient_array = array[i].ingredients;
    //         ingredient_array = ingredient_array.map(ingredients => {
    //             return ingredients = ingredients.toLowerCase();
    //         });
    //         const found = ingredients_to_prioritize.some(r => ingredient_array.includes(r));
    //         if (found === false) {
    //             continue FilterLoop;
    //         }
    //         else if (found === true) {
    //             let counter = 0;
    //             for (let j = 0; j < ingredients_to_prioritize.length; j++) {
    //                 if (ingredient_array.includes(ingredients_to_prioritize[j])) {
    //                     counter++;
    //                 }
    //                 if (counter === props.filters.length) {
    //                     personal_array.push(array[i]);
    //                     //console.log(personal_array)
    //                 }
    //             }
    //         }
    //     }
    //     setdata(personal_array);
    // }

    // async function allergyFilter(array) {
    //     let data_with_allergy_filter = [];
    //     DataLoop: for (let i = 0; i < array.length; i++) {
    //         let ingredient_array = array[i].ingredients;
    //         ingredient_array = ingredient_array.map(ingredients => {
    //             return ingredients = ingredients.toLowerCase();
    //         })
    //         // console.log(ingredient_array);
    //         if ((ingredient_array.includes("milk")) && (props.ingredients_to_avoid.includes("milk"))) { //.INCLUDES() CHECKS FOR THE EXACT CHARACTER, RETURNS FALSE IF FINDING "MILK" IN "COCONUT MILK"
    //             continue DataLoop; //Continue to next iteration
    //         }
    //         else {
    //             const found = props.ingredients_to_avoid.some(r => ingredient_array.includes(r));
    //             // console.log(found);
    //             if (found === true) {
    //                 continue DataLoop;
    //             }
    //         }
    //         data_with_allergy_filter.push(array[i]);
    //     }
    //     if (props.filter_check === true) {
    //         personFilters(data_with_allergy_filter);
    //         return;
    //     }
    //     setdata(data_with_allergy_filter)
    // }

    var check = props.input;
    const checkArray = check.split(" ");
    var bufferMatrix = [];
    // For every word in the input string:
    checkArray.filter((word) => {
        // Ignore spaces
        if(word !== "")
        {
            // If word exists in dictionary, do not find Lev, just put into queue
            if(dict.includes(word))
            {
                var queue = new PriorityQueue(function(a, b) { return b.lev - a.lev; });
                queue.enq({lev: 0, inputWord: word});
                bufferMatrix.push(queue);
            }
            else // Find Lev distance of every dictionary word
            {
                var queue2 = new PriorityQueue(function(a, b) { return b.lev - a.lev; });

                // For every word in the dictionary:
                for (const dictWord of dict)
                {
                    // If word is less than 3 characters long, then set threshold to length of input word
                    const thresh = Math.min(word.length, 3);

                    // Using the threshold, compare the lev distance of the input word to the current word in the dictionary
                    var levDist = distance(word.toLowerCase(), dictWord);
                    if(levDist <= thresh)
                    {
                        // Put dictionary word into queue with priority set to lev distance of input word
                        queue2.enq({lev: levDist, inputWord: dictWord});
                    }
                }
                // After going through dictionary, push the final queue
                if(!queue2.isEmpty())
                {
                    bufferMatrix.push(queue2);
                }
            }
            return true;
        }
        else {return false;}
    });
    var finalComparison = [];
    for(const q of bufferMatrix)
    {
        var counter = 0;
        var newQ = [];
        // Only take the 5 most relevant autocorrect words
        while(!q.isEmpty() && counter < 5)
        {
            newQ.push(q.peek());
            q.deq();
            counter++;
        }
        counter = 0;
        finalComparison.push(newQ);
    }
    // Empty the buffer
    bufferMatrix.splice(0, bufferMatrix.length);

    const filteredData = data.filter((el) => {
        //return the item which contains the user input
        if(props.input !== "") {
            var keep = true;
            if(finalComparison.length === 0){
                return false;
            }
            for(const row of finalComparison)
            {
                if(keep)
                {
                    keep = false;
                    for (const col of row)
                    {
                        var reg = new RegExp("(^|[^A-Za-z0-9_])" + col.inputWord + "($|[^A-Za-z0-9_]|S)", 'i');
                        if(reg.test(el.Name.toLowerCase()))
                        {
                            keep = true;
                        }
                    }
                }
                else
                {
                    return false;
                }
                if(!keep)
                {
                    return false;
                }
            }
            return true;
        }
        // if no input the return the original
        else if(props.filter_check){
            return true;
        }
        else{
            return '';
        }
    })

    // const filteredData = data.filter((el) => {
    //     // if no input the return the original
    //     if (props.input === '') {
    //         //return el;
    //         return '';
    //     }
    //     //return the item which contains the user input
    //     else {
    //         return el.Name.toLowerCase().includes(props.input);
    //     }
    // })

    return (
        <ul className="SearchWrapper">
            <div >
                {filteredData.map((item) => (
                    <div key={item.id}>
                        <Link to={'/home/exercisesearch/ExerciseDetails/' + item.Name.replaceAll(" ", "-")} state={{ name: item.Name, instructions: item.Instructions, tools: item.ToolS, img: item.imgE, part: item.Part}}>
                            <button className="searchResults">{item.Name}</button>
                        </Link><br />
                    </div>
                ))}
            </div>
        </ul>
    )
}

export default ListEx