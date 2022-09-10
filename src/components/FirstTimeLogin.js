import './styles/FirstTimeLogin.css';
import { useState } from 'react';
import {Link, Navigate } from 'react-router-dom';
// import {Profile} from './component/Profile'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';

function FirstTimeLogin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/Profile', {state:{name: name, age: age, gender:gender, weight:weight, height:height}});
  }


  return (
    <div className="form-part">
    <h3>Please tell us about yourself</h3>
      <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>Enter your age:
        <input 
          type="number" 
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <label>Enter your gender:
        <input type="radio" value="Male" name="gender" onChange={(e) => setGender(e.target.value)}/> Male
        <input type="radio" value="Female" name="gender"onChange={(e) => setGender(e.target.value)}/> Female
        <input type="radio" value="Other" name="gender" onChange={(e) => setGender(e.target.value)}/> Other      
      </label>
      <label>Enter your weight:
        <input 
          type="number" 
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>
      <label>Enter your height:
        <input 
          type="number" 
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
  )
}

export default FirstTimeLogin;