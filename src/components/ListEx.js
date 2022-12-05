import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/SearchResults.css';
import dict from "./JSON files/ExerciseDictionary.json";
import { distance } from 'fastest-levenshtein';
var PriorityQueue = require('priorityqueuejs');

function ListEx(props) {
    const [data, setdata] = useState([]);

    useEffect(() => {
        gatherArrays();
    }, []);
    console.log(data.length)
    const gatherArrays = () => {
        let filtered_array = [];
        let arms = [];
        let legs = [];
        let back = [];
        let chest = [];
        for (let i = 0; i < props.exercise_data.length; i++) {
            if (props.exercise_data[i].Part === "arms") {
                arms.push(props.exercise_data[i]);
            }
            if (props.exercise_data[i].Part === "legs") {
                legs.push(props.exercise_data[i]);
            }
            if (props.exercise_data[i].Part === "back") {
                back.push(props.exercise_data[i]);
            }
            if (props.exercise_data[i].Part === "chest") {
                chest.push(props.exercise_data[i]);
            }
        }
        if (props.part_checks.Arms === true) {
            for (let i = 0; i < arms.length; i++) {
                filtered_array.push(arms[i]);
            }
        }
        if (props.part_checks.Legs === true) {
            for (let i = 0; i < legs.length; i++) {
                filtered_array.push(legs[i]);
            }
        }
        if (props.part_checks.Back === true) {
            for (let i = 0; i < back.length; i++) {
                filtered_array.push(back[i]);
            }
        }
        if (props.part_checks.Chest === true) {
            for (let i = 0; i < chest.length; i++) {
                filtered_array.push(chest[i]);
            }
        }
        if (filtered_array.length !== 0) {
            setdata(filtered_array);
        }
        else {
            for (let i = 0; i < props.exercise_data.length; i++) {
                let string = props.exercise_data[i].Part.charAt(0).toUpperCase() + props.exercise_data[i].Part.slice(1)
                if (props.exercises.includes(string)) {
                    filtered_array.push(props.exercise_data[i]);
                }
            }
            setdata(filtered_array);
        }
    }
    
    var check = props.input;
    const checkArray = check.split(" ");
    var bufferMatrix = [];
    // For every word in the input string:
    checkArray.filter((word) => {
        // Ignore spaces
        if (word !== "") {
            // If word exists in dictionary, do not find Lev, just put into queue
            if (dict.includes(word)) {
                var queue = new PriorityQueue(function (a, b) { return b.lev - a.lev; });
                queue.enq({ lev: 0, inputWord: word });
                bufferMatrix.push(queue);
            }
            else // Find Lev distance of every dictionary word
            {
                var queue2 = new PriorityQueue(function (a, b) { return b.lev - a.lev; });

                // For every word in the dictionary:
                for (const dictWord of dict) {
                    // If word is less than 3 characters long, then set threshold to length of input word
                    const thresh = Math.min(word.length, 3);

                    // Using the threshold, compare the lev distance of the input word to the current word in the dictionary
                    var levDist = distance(word.toLowerCase(), dictWord);
                    if (levDist <= thresh) {
                        // Put dictionary word into queue with priority set to lev distance of input word
                        queue2.enq({ lev: levDist, inputWord: dictWord });
                    }
                }
                // After going through dictionary, push the final queue
                if (!queue2.isEmpty()) {
                    bufferMatrix.push(queue2);
                }
            }
            return true;
        }
        else { return false; }
    });
    var finalComparison = [];
    for (const q of bufferMatrix) {
        var counter = 0;
        var newQ = [];
        // Only take the 5 most relevant autocorrect words
        while (!q.isEmpty() && counter < 5) {
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
        if (props.input !== "") {
            var keep = true;
            if (finalComparison.length === 0) {
                return false;
            }
            for (const row of finalComparison) {
                if (keep) {
                    keep = false;
                    for (const col of row) {
                        var reg = new RegExp("(^|[^A-Za-z0-9_])" + col.inputWord + "($|[^A-Za-z0-9_]|S)", 'i');
                        if (reg.test(el.Name.toLowerCase())) {
                            keep = true;
                        }
                    }
                }
                else {
                    return false;
                }
                if (!keep) {
                    return false;
                }
            }
            return true;
        }
        // if no input the return the original
        else if (props.filter_check) {
            return true;
        }
        else {
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
                        <Link to={'/home/exercisesearch/ExerciseDetails/' + item.Name.replaceAll(" ", "-")} state={{ name: item.Name, instructions: item.Instructions, tools: item.ToolS, img: item.imgE, part: item.Part }}>
                            <button className="searchResults">{item.Name}</button>
                        </Link><br />
                    </div>
                ))}
            </div>
        </ul>
    )
}

export default ListEx