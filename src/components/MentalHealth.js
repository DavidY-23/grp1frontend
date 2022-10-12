import React from 'react';
import { Link } from "react-router-dom";
import "./styles/MentalHealth.css"
import mentalHealth from "../images/MentalHealth.jpg"
import notebook from "../images/notebook.png";

function MentalHealth() {

    return (
        <div className="MentalHealthPage">
            <header className="MentalHeader">
                <div className="MentalContainer">
                    <div>
                        <h1>Mental Health</h1>
                        <p>Below are some helpful Links that can help you.</p>
                    </div>
                    <img src={mentalHealth} className="MentalImage"/>
                </div>
            </header>
            <section className="MentalBoxes">
                <div className="MentalBox">
                    <h2 className='Theh1sh2s'>Tips</h2>
                    <p>
                        <a href="http://www.bcmhsus.ca/about/news-stories/stories/10-tips-to-boost-your-mental-health" target="_blank">Ten Tips</a>
                    </p>
                </div>
                <div className="MentalBox">
                    <h2 className='Theh1sh2s'>Exercise</h2>
                    <p>
                        <a>Article Here</a>
                    </p>
                </div>
                <div className="MentalBox" id="journalbox">
                    <p>
                        <Link to="/JournalEntry" id="JumpToJournal">
                            <h3 id="JournalTitle">Write a entry.</h3>
                        </Link>
                    </p>
                    <img src={notebook}/>
                    
                </div>
                
            </section>
        </div>
    );
}

export default MentalHealth;