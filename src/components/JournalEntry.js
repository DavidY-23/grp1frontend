import React from 'react';
import './styles/JournalEntry.css';

function JournalEntry() {
    // Have a state variable that will store the entry in a object as a entryText property
    const [entry, setEntry] =React.useState({
        nameOfEntry: "",
        entryText: ""
    });

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

    function handleSave(e) {
        // Will not rerender the page when Save button is pressed
        e.preventDefault();
    }

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
                <button className="JournalButton">Discard</button>
                <button className="JournalButton">Change Name</button>
            </div>
        </div>
    );

}

export default JournalEntry;