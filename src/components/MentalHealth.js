import React from 'react';
import { Link } from "react-router-dom";
import "./styles/MentalHealth.css"
import mentalHealth from "../images/MentalHealth.jpg"

function MentalHealth() {

    return (
        <div className="MentalHealthPage">
            <header className="MentalHeader">
                <div className="MentalContainer">
                    <div>
                        <h1>Mental Health</h1>
                        <p>Here are helpful Links for them</p>
                    </div>
                    <img src={mentalHealth} className="MentalImage"/>
                </div>
            </header>
            <section class="MentalBoxes">
                <div class="MentalContainer">
                    <div class="MentalBox">
                        <h2 className='Theh1sh2s'>10 Tips</h2>
                        <p>
                            <a href="http://www.bcmhsus.ca/about/news-stories/stories/10-tips-to-boost-your-mental-health" target="_blank">Link</a>
                        </p>
                    </div>
                    <div class="MentalBox">
                        <h2 className='Theh1sh2s'>Option 2</h2>
                        <p>
                            Have an option here.
                        </p>
                    </div>
                    <div class="MentalBox">
                        <h2 className='Theh1sh2s'>Journal Entry</h2>
                        <p>
                            <Link to="/JournalEntry" id="JumpToJournal">
                                Write a entry.
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MentalHealth;