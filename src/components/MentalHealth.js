import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"; // Need this
import "./styles/MentalHealth.css"
import mentalHealth from "../images/MentalHealth.jpg"
import notebook from "../images/notebook.png";

function MentalHealth() {
    // Array of links for Mental Health, a random link is selected 
    const links=["http://www.bcmhsus.ca/about/news-stories/stories/10-tips-to-boost-your-mental-health",
    "https://www.mhanational.org/31-tips-boost-your-mental-health",
    "https://childadolescentpsych.cumc.columbia.edu/articles/11-tips-mental-health-well-being",
    "https://uhs.umich.edu/tenthings",
    "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
    "https://www.mentalhealth.org.uk/explore-mental-health/publications/our-best-mental-health-tips",
    "https://www.bbrfoundation.org/blog/everyday-mental-health-tips",
    "https://www.self.com/story/best-mental-health-tips",
    "https://www.dean.edu/news-events/dean-college-blog/story/6-mental-health-tips-college-students/",
    ];

    // State for random Index
    const [randIndex, setindex]=useState(Math.floor(Math.random() * ((links.length-1)) ));

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
                        <a href={links[randIndex]} target="_blank">Ten Tips</a>
                    </p>
                </div>
                <div className="MentalBox">
                    <h2 className='Theh1sh2s'>Back to Home</h2>
                    <Link to="/home/profile">
                        <p>Profile</p>
                    </Link>
                </div>
                <div className="MentalBox" id="journalbox">
                    <p>
                        <Link to="/home/MentalHealth/JournalEntry">
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