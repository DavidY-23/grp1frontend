import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css'
import "@fontsource/comic-neue";
import { Navigate } from 'react-router';
import './styles/Overview.css'
import triangle from '../images/triangle.png'


function Overview() {
  const [name, setname] = useState("");
  const [weight, setweight] = useState("");
  const [height, setheight] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState("");
  const [about_user, setabout_user] = useState("");
  const [edit_mode, setedit_mode] = useState(false);
  const [redirect, setredirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setredirect(true);
  }
  if (redirect == true) {
    return (<Navigate to="/home/profile" />)
  }
  return (
    <div className='OverviewBody'>
      <form className='overview-form' onSubmit={(e) => handleSubmit(e)}>
        <div class='triangle-image'>
          <img src={triangle} alt='' align='right' ></img>
        </div>
        <div className='first_name' >Name
          <input className='first_name_container' name='name' value={name} onChange={(e) => setname(e.target.value)} />
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
        <div className='about_me' >About Me
          <textarea className='about_container' size="100" name='about_user' value={about_user} onChange={(e) => setabout_user(e.target.value)} />
        </div>
        {/* Editing Button */}
        <button className='edit_button' > Submit changes</button>
      </form>
    </div>
  )
}

export default Overview;