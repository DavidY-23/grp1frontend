import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css'
import "@fontsource/comic-neue";
import { Navigate } from 'react-router';
import './styles/Overview.css'
import triangle from '../images/triangle.png'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import db from './firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';

function Overview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [first_name, set_firstname] = useState(location.state.firstName);
  const [last_name, set_lastname] = useState(location.state.lastName);
  const [weight, setweight] = useState(location.state.weight);
  const [height, setheight] = useState(location.state.height);
  const [gender, setgender] = useState(location.state.gender);
  const [age, setage] = useState(location.state.age);
  const [allergies, setAllergies] = useState(location.state.allergies);
  const [injury, setInjury] = useState(location.state.injury);
  const [redirect, setredirect] = useState(false);


  useEffect(() => {
    //Checking Gender
    if (location.state.gender == "Male") {
      let male = document.getElementById("male-check");
      male.checked = true;
    }
    if (location.state.gender == "Female") {
      let female = document.getElementById("female_check");
      female.checked = true;
    }
    if (location.state.gender == "Other") {
      let other = document.getElementById("other-check");
      other.checked = true;
    }
    //Checking Allergies Array
    if (location.state.allergies.includes("Milk")) {
      let allergy_input = document.getElementById('Milk');
      allergy_input.checked = true;
      // setAllergies((prevArray => [...prevArray, allergies]))
    }
    if (location.state.allergies.includes("Nuts")) {
      let nuts = document.getElementById('Nuts');
      nuts.checked = true;
    }
    if (location.state.allergies.includes("Eggs")) {
      let eggs = document.getElementById('Eggs');
      eggs.checked = true;
    }
    if (location.state.allergies.includes("Fish")) {
      let fish = document.getElementById('Fish');
      fish.checked = true;
    }
    if (location.state.allergies.includes("Wheat")) {
      let wheat = document.getElementById('Wheat');
      wheat.checked = true;
    }
    if (location.state.allergies.includes("Shellfish")) {
      let shellfish = document.getElementById('Shellfish');
      shellfish.checked = true;
    }
    if (location.state.allergies.includes("Soybeans")) {
      let soybeans = document.getElementById('Soybeans');
      soybeans.checked = true;
    }
    //Checking Injuries Array
    if(location.state.injury.includes("Arms"))
    {
      let arms = document.getElementById('Arms');
      arms.checked = true;
    }
    if(location.state.injury.includes("Legs"))
    {
      let legs = document.getElementById('Legs');
      legs.checked = true;
    }
    if(location.state.injury.includes("Shoulders"))
    {
      let shoulders = document.getElementById('Shoulders');
      shoulders.checked = true;
    }
    if(location.state.injury.includes("Chest"))
    {
      let chest = document.getElementById('Chest');
      chest.checked = true;
    }
  }, []);

  async function changeUserInformation() {
    try {
      await setDoc(doc(db, "Users", location.state.userID), {
        uniqueId: location.state.userID,
        firstName: first_name,
        lastName: last_name,
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        allergies: allergies,
        injury: injury
      });
    }
    catch (error) {
      console.log(error.code + error.message);
      alert(error.message);
    }
  }
  const handleSubmit = async event => {
    event.preventDefault();
    changeUserInformation();
    navigate("/home/profile", {
      state: {
        firstName: first_name,
        lastName: last_name,
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        allergies: allergies,
        injury: injury,
        userID: location.state.userID,
      }
    })
  }


  const handleInjury = async (event) => {
    if (event.target.checked) {
      setInjury((oldArray) => [...oldArray, event.target.value]);
    } else {
      setInjury((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      );
    }
  };

  const handleAllergy = async (event) => {
    if (event.target.checked) {
      setAllergies((oldArray) => [...oldArray, event.target.value]);
    } else {
      setAllergies((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      );
    }
  };


  // if (redirect == true) {
  //   return (<Navigate to="/home/profile" />)
  // }
  return (
    <div className='OverviewBody'>
      <form className='overview-form' onSubmit={(e) => handleSubmit(e)}>
        <div class='triangle-image'>
          <img src={triangle} alt='' align='right' ></img>
        </div>
        <label for='first_name_box' > First Name
          <input id='first_name_box' placeholder='First Name' class='form-control' name='first_name' value={first_name} onChange={(e) => set_firstname(e.target.value)} />
        </label>
        <br />
        <label for='last_name_id' >Last Name
          <input placeholder='Last Name' id='last_name_id' class='form-control' name='last_name' value={last_name} onChange={(e) => set_lastname(e.target.value)} />
        </label>
        <br />
        <label for='age_id' >Age
          <input id='age_id' class='form-control' type='number' name='age' value={age} onChange={(e) => setage(e.target.value)} />
        </label>
        <br />
        <br />
        <label for='gender_id' class='mr-sm-2' >Gender
          {/* <select id='gender_id' class="custom-select mr-sm-2" name='gender' value={gender} onChange={(e) => setgender(e.target.value)} >
            <option selected>Choose...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</opt
            ion>
          </select> */}
        </label>

        <div class="form-check">
          <input class="form-check-input"
            type="radio"
            value="Male"
            name="gender"
            onChange={(e) => setgender(e.target.value)}
            id='male-check'
          />
          <label class='form-check-label' for='male-check'>Male </label>
        </div>
        <div class="form-check">
          <input class="form-check-input"
            type="radio"
            value="Female"
            name="gender"
            id = 'female_check'
            onChange={(e) => setgender(e.target.value)}
          />
          <label class='form-check-label' for='male-check'>Female </label>
        </div>
        <div class="form-check">
          <input class="form-check-input"
            type="radio"
            value="Other"
            name="gender"
            id = 'other-check'
            onChange={(e) => setgender(e.target.value)}
          />
          <label class='form-check-label' for='male-check'>Other </label>

        </div>
        <br />
        <label for='weight_box' >Weight
          <input placeholder='Weight' class='form-control' id='weight_box' type='number' name='weight' value={weight} onChange={(e) => setweight(e.target.value)} />
        </label>
        <label for='height_box' >Height (Inches)
          <input class='form-control' placeholder='Height' id='height_box' type='number' name='height' value={height} onChange={(e) => setheight(e.target.value)} />
        </label>
        {/* <div className='about_me' >About Me
          <textarea className='about_container' size="100" name='about_user' value={about_user} onChange={(e) => setabout_user(e.target.value)} />
        </div> */}
        <br />
        <div className="loginLabel">
          Any food allergies?
          <br />
          <label className="food">
            <input
              type="checkbox"
              value="Milk"
              name="Milk"
              id="Milk"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Milk
          </label>
          <br />
          <label className="food">
            <input
              type="checkbox"
              value="Nuts"
              name="Nuts"
              id="Nuts"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Nuts
          </label>
          <br />
          <label className="food">
            <input
              type="checkbox"
              value="Eggs"
              name="Eggs"
              id="Eggs"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Eggs
          </label>
          <br />
          <label className="food">
            <input
              type="checkbox"
              value="Fish"
              name="Fish"
              id="Fish"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Fish
          </label>
          <br />
          <label className="food">
            <input
              type="checkbox"
              value="Wheat"
              name="Wheat"
              id="Wheat"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Wheat
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Shellfish"
              name="Shellfish"
              id="Shellfish"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Shellfish
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Soybeans"
              name="Soybeans"
              id="Soybeans"
              className="foodz"
              style={{ visibility: "visible" }}
              onChange={handleAllergy}
            />
            Soybeans
          </label>
          <br />
        </div>
        <br />
        <div>
          Any current injuries that would prevent you from a certain
          exercise?
          <br />
          <label>
            <input
              type="checkbox"
              value="Arms"
              name="Arms"
              id="Arms"
              style={{ visibility: "visible" }}
              onChange={handleInjury}
            />
            Arms
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Legs"
              name="Legs"
              id="Legs"
              style={{ visibility: "visible" }}
              onChange={handleInjury}
            />
            Legs
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Shoulders"
              name="Shoulders"
              id="Shoulders"
              style={{ visibility: "visible" }}
              onChange={handleInjury}
            />
            Shoulders
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Chest"
              name="Chest"
              id="Chest"
              style={{ visibility: "visible" }}
              onChange={handleInjury}
            />
            Chest
          </label>
          <br />
        </div>
        {/* Editing Button */}
        <button className='edit_button' > Submit changes</button>
      </form>
    </div>
  )
}

export default Overview;