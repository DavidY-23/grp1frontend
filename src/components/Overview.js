import React, { useState, Component } from 'react';
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
  const [about_user, setabout_user] = useState("");
  const [edit_mode, setedit_mode] = useState(false);
  const [redirect, setredirect] = useState(false);
  

  async function changeUserInformation() {
    try{
      await setDoc(doc(db, "Users", location.state.userID), {
        uniqueId: location.state.userID,
        firstName: first_name,
        lastName: last_name,
        age: age,
        gender: gender,
        weight: weight, 
        height: height,
        allergies: location.state.allergies,
        injury: location.state.injury
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
    navigate("/home/profile",{
      state:{
        firstName: first_name,
        lastName: last_name,
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        allergies: location.state.allergies,
        injury: location.state.injury,
        userID: location.state.userID,
      }
    })
  }
  // if (redirect == true) {
  //   return (<Navigate to="/home/profile" />)
  // }
  return (
    <div className='OverviewBody'>
      <form className='overview-form' onSubmit={(e) => handleSubmit(e)}>
        <div class='triangle-image'>
          <img src={triangle} alt='' align='right' ></img>
        </div>
        <div className='first_name' >First Name
          <input placeholder='First Name' className='first_name_container' name='first_name' value={first_name} onChange={(e) => set_firstname(e.target.value)} />
        </div>
        <div className='last_name' >Last Name
          <input className='last_name_container' name='last_name' value={last_name} onChange={(e) => set_lastname(e.target.value)} />
        </div>
        <div className='age' >Age
          <input className='age_container' type='number' name='age' value={age} onChange={(e) => setage(e.target.value)} />
        </div>
        <div className='gender' >Gender
          <input className='gender_container' name='gender' value={gender} onChange={(e) => setgender(e.target.value)} />
        </div>
        <div className='weight' >Weight
          <input className='weight_container' type='number' name='weight' value={weight} onChange={(e) => setweight(e.target.value)} />
        </div>
        <div className='height' >Height
          <input className='height_container' type='text' name='height' value={height} onChange={(e) => setheight(e.target.value)} />
        </div>
        {/* <div className='about_me' >About Me
          <textarea className='about_container' size="100" name='about_user' value={about_user} onChange={(e) => setabout_user(e.target.value)} />
        </div> */}
        {/* Editing Button */}
        <button className='edit_button' > Submit changes</button>
      </form>
    </div>
  )
}

export default Overview;