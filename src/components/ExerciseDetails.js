import React from "react";
import { useLocation } from "react-router-dom";
import './styles/RecipeDetails.css'
import home from "../images/homeIcon.png";
import search from "../images/OtherSearchIcon.png";
import { Link } from 'react-router-dom';

const ExerciseDetails = (props) => {
    const location = useLocation();
    const { name, img, instructions, tools } = location.state;
    // const siz = Object.keys(measurements).length;
    // console.log(name.length);

    const onCheck = () => { 
        console.log('The checkbox was toggled'); 
    }; 

    const onNavCheck = event => {
        if(event.target.checked) {
            console.log("Nav toggled on");
            document.getElementById("NavBox").style.visibility = "visible";
            document.getElementById("NavBox").style.animationName = "marquee2";
            document.getElementById("NavBox").style.animationDuration = "1s";
            document.getElementById("NavBox").style.animationDirection = "normal";
            document.getElementById("NavBox").style.animationFillMode = "forwards";

            document.getElementById("NavCheck").style.animationName = "marquee4";
            document.getElementById("NavCheck").style.animationDuration = "1s";
            document.getElementById("NavCheck").style.animationDirection = "normal";
            document.getElementById("NavCheck").style.animationFillMode = "forwards";
        }
        else {
            console.log("Nav toggled off");
            document.getElementById("NavBox").style.animationName = "marquee3";
            document.getElementById("NavBox").style.animationDuration = "1s";
            document.getElementById("NavBox").style.animationDirection = "normal";
            document.getElementById("NavBox").style.animationFillMode = "forwards";

            document.getElementById("NavCheck").style.animationName = "marquee5";
            document.getElementById("NavCheck").style.animationDuration = "1s";
            document.getElementById("NavCheck").style.animationDirection = "normal";
            document.getElementById("NavCheck").style.animationFillMode = "forwards";
        }
    };

    return (
        <div className="detailsBG">
            <div className="detailsNav">
                <div id="NavBox" className="detailsNavBox">
                    <Link to="/home/profile"><img className="HomeIcon" src={home} alt="oops"/></Link>
                    <Link to="/home/exercisesearch"><img className="SearchIcon" src={search} alt="oops"/></Link>
                </div>
                <label id="NavCheck" className="detailsNavMain">
                    <input className="detail-checkbox" type="checkbox" onChange={onNavCheck}/>
                    <span className="detailsNavCheck"></span>
                </label>
            </div>

            <div className="RecipeDetailsWrapper">
                <div className="wrapper3d">
                    <div className="box3D">
                        <div className="inner3D">
                            {(name.length > 33 ? (<span className="RecipeNameTooLong">{name}</span>) : (<span className="RecipeName">{name} </span>))}
                            {/* <span className="RecipeName">{name} </span> */}
                        </div>
                        <div className="inner3D">
                        {(name.length > 32 ? (<span className="RecipeNameTooLong">{name}</span>) : (<span className="RecipeName">{name} </span>))}
                            {/* <span className="RecipeName">{name} </span> */}
                        </div>
                    </div>
                </div>
                <img className="RecipeImg" src={img} alt="Oops"/>
                <p className="RecipeYT"></p> <br/> <br/>

                <div className="IngredientsDiv">
                    <h2 className="Ingr">Tools</h2>
                    <ul className="Ingredients">
                        {tools.map((tool, index) => {
                            return(
                                    <li className="ingredient" key={index}>{tool}</li>
                            )
                        })} 
                    </ul>
                </div>
                <br/> <br/>

                <div className="instr">
                    <h2 className="InstructionTitle">Instructions</h2> <br/>
                    <div className="Instructions">{instructions}</div>
                </div>
            </div>
            
            <div className="FAB">
                <label className="fabMain">
                    <input className="detail-checkbox" type="checkbox" onChange={onCheck}/>
                    <span className="fabCheck"></span>
                </label>
            </div>
        </div>
    );
};

export default ExerciseDetails;