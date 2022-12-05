import React from 'react';
import { Link } from "react-router-dom";
import { collection, doc, query, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import db from './firebase.js';
import './styles/JournalEntry.css';

function JournalEntry(props) {
    // Have a state variable for the index of the array of Jounral Entries
    const [index, setIndex]=React.useState(0);

    // Save Number of Journal Entries
    const [numberOfEntries, setNumber]=React.useState(0);    

    // Have a state variable that will store the entry in a object as a entryText property
    const [entry, setEntry] =React.useState({
        nameOfEntry:  "", 
        entryText: ""
    });

    // The reference to the Collection of JounralEntries
    const journalRef=collection(db, "JournalEntry");

    // The reference to the actual document containing Journal Entries 
    const docRef=doc(db, "JournalEntry", props.userID);

    // Need the useEffect hook
    React.useEffect(()=> {
        getDoc(docRef).then((doc)=> {
            setNumber(doc.data().entries.length);
            setEntry({
                nameOfEntry: doc.data().entries[index].title,
                entryText: doc.data().entries[index].entry
            });
        });
    },[index]);


    // Handle Whenever the Jounrey Entry changes 
    function handleTextChange(event) {
        setEntry( prevEntry => {
            return {
                ...prevEntry,
                [event.target.name]: event.target.value
            };
        });
        //console.log(entry.nameOfEntry);
    }

    // Handle the Create New Button
    function handleSave(e) {
        // Will not rerender the page when Save button is pressed
        //e.preventDefault();
        // Update Document in Firestore 
        const docRef=doc(db, "JournalEntry", props.userID);
        getDoc(docRef).then((doc)=> {
            // Updating the Journal Entries Array 
            const allEntries=[...(doc.data().entries)];
            const updateEntry={
                entry : entry.entryText,
                title: entry.nameOfEntry
            };
            allEntries[index]=updateEntry;

            updateDoc(docRef, {
                ...doc.data(),
                entries: allEntries
            });
        });
    }

    // Handle Create New Button
    function handleCreateNew(e) {
        if(entry.entryText!=="Entry Here" && entry.nameOfEntry!=="Enter Title") {
            // Add entry into document entry array
            const docRef=doc(db, "JournalEntry", props.userID);
            getDoc(docRef).then((doc)=> {
                // Updating the Journal Entries Array with a new Entry
                const updateEntry={
                    entry : "Entry Here",
                    title: "Enter Title"
                };
                const allEntries=[...(doc.data().entries), updateEntry];

                updateDoc(docRef, {
                    ...doc.data(),
                    entries: allEntries
                });

                // Update index state as well
                setIndex(prevIndex=> prevIndex+1);
                
            });
        }
        else {
            alert("Change Default Text");
        }
    }

    // Handle the Previous button
    function handlePrevious(e) {
        if(index!==0) {
            setIndex(prevIndex=> prevIndex-1);
        }
    }

    // Handle the Next Button
    function handleNext(e) {
        if(index<numberOfEntries-1) {
            setIndex(prevIndex=> prevIndex+1);
        }
    }
    console.log("index", index);
    console.log("number of entries", numberOfEntries);
    return (
        <div className='JournalEntryPage'>
            <form className="formForEntry">
                <input
                    type="text"
                    placeholder='Name Of Entry'
                    name="nameOfEntry"
                    onChange={handleTextChange}
                    value={entry.nameOfEntry}
                    className="InputTextForMental"
                    id="TitleOfEntry"
                />
                <br />
                <textarea
                    value={entry.entryText}
                    placeholder="Type Journal Entry"
                    name="entryText"
                    onChange={handleTextChange}
                    className="InputTextForMental"
                    id="entryItSelf"
                />
            </form>
            <div className='JournalButtons'>
                <button className="JournalButton" onClick={handleSave}>Save</button>
                {(index===numberOfEntries-1) ?(<button className="JournalButton" onClick={handleCreateNew}>Create New</button>) :(<p/>)}
                {(index===0) ? (<p/>): (<button className="JournalButton" onClick={handlePrevious}>Previous</button>)}
                {(index<numberOfEntries-1) ? (<button className="JournalButton" onClick={handleNext}>Next</button>) : (<p/>)}
                <Link to="/home/MentalHealth" className='BackLink'>
                    Go Back
                </Link>
                
            </div>
        </div>
    );

}

export default JournalEntry;