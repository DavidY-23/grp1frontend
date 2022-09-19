import './styles/FirstTimeLogin.css';
import { useState } from 'react';
import {Link, Navigate } from 'react-router-dom';
// import {Profile} from './component/Profile'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';
import { FormControl } from '@mui/material';
import { tsConstructorType } from '@babel/types';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
function FirstTimeLogin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [page, setPage] = useState(0);
  const [allergies, setAllergies] = useState([]);
  const [injury, setInjury] = useState([]);
  var injuryCheckBox = [];

  const handlePrevious = () => {
    setPage(0);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (page === 0) {
      setPage(1)
      return;
      console.log("Page 2")
    }
    if (page === 1)
      navigate('/Profile', {state:{name: name, age: age, gender:gender, weight:weight, height:height, allergies: allergies, injury: injury}});
  }

  const handleAllergy = async (event) => {
    if (event.target.checked) {
      setAllergies(oldArray => [...oldArray, event.target.value] );
    } else {
      setAllergies((prevState) => 
        prevState.filter((prevItem) => prevItem !== event.target.value));
    }
  }

  const handleInjury = async (event) => {
    if (event.target.checked) {
      injuryCheckBox.push(event.target.value)
    } else {
      const res = injuryCheckBox.filter(item => item !== event.target.value)
      injuryCheckBox = res;
    }
    setInjury(injuryCheckBox);
  }

  if (page === 0) {
    return (
      <div className="form-part">
      <h3>Please tell us about yourself</h3>
        <form onSubmit={handleSubmit}>
        <label className="loginLabel">Enter your name: 
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="loginLabel">Enter your age: 
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label className="loginLabel">Enter your gender:
          <input type="radio" value="Male" name="gender" onChange={(e) => setGender(e.target.value)}/> Male
          <input type="radio" value="Female" name="gender"onChange={(e) => setGender(e.target.value)}/> Female
          <input type="radio" value="Other" name="gender" onChange={(e) => setGender(e.target.value)}/> Other      
        </label>
        <label className="loginLabel">Enter your weight (lbs):
          <input 
            type="number" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label className="loginLabel">Enter your height (in):
          <input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <input className="button" type="submit" value="Next" />
      </form>
    </div>
    )
  }
  if (page === 1) {
    return (
      <div className="form-part">
      <h3>Please tell us about yourself</h3>
        <form onSubmit={handleSubmit}>
          <label className="loginLabel">Any food allergies?: 
            <input type="checkbox" value="Milk" onChange={handleAllergy} />Milk
            <input type="checkbox" value="Nuts" onChange={handleAllergy} />Nuts
            <input type="checkbox" value="Eggs" onChange={handleAllergy} />Eggs
            <input type="checkbox" value="Fish" onChange={handleAllergy} />Fish
            <input type="checkbox" value="Wheat" onChange={handleAllergy} />Wheat
            <input type="checkbox" value="Shellfish" onChange={handleAllergy} />Shellfish
            <input type="checkbox" value="Soybeans" onChange={handleAllergy} />Soybeans
          </label>
          <label className="loginLabel">Any current injuries that would prevent you from exercises?: 
          <input type="checkbox" value="Arms" onChange={handleInjury} />Arms
            <input type="checkbox" value="Legs" onChange={handleInjury} />Legs
            <input type="checkbox" value="Shoulders" onChange={handleInjury} />Shoulders
            <input type="checkbox" value="Chest" onChange={handleInjury} />Chest
          </label>
          <input className="button" type="submit" onClick={handlePrevious} value="Previous" /> 
          <input className="button" type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}

export default FirstTimeLogin;