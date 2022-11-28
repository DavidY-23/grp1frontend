import "./styles/FirstTimeLogin.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import db from './firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';


function FirstTimeLogin(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState(false);

  const handlePrevious = () => {
    setPage(0);
  };

  async function addExtras() {
    try {
      await setDoc(doc(db, "Users", props.userID), {
        uniqueId: props.userID,
        firstName: props.firstName,
        lastName: props.lastName,
        age: props.age,
        gender: props.gender,
        weight: props.weight,
        height: props.height,
        allergies: props.allergies,
        injury: props.injury,
        filters: props.filters,
        ingredient_names: props.ingredient_names,
        ingredients_to_avoid: props.ingredients_to_avoid,
        filter_check: props.filter_check,
        allergy_check: props.allergy_check,
      });
    }
    catch (error) {
      console.log(error.code + error.message);
      alert(error.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (page === 0) {
      setPage(1);
      return;
    }
    if (page === 1)
      navigate("/home/profile");
    addExtras();
    console.log(props)
  };

  const handleAllergy = async (event) => {
    if (event.target.checked) {
      props.setAllergies((oldArray) => [...oldArray, event.target.value]);
    } else {
      props.setAllergies((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      );
    }
  };

  const handleInjury = async (event) => {
    if (event.target.checked) {
      props.setInjury((oldArray) => [...oldArray, event.target.value]);
    } else {
      props.setInjury((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      );
    }
  };

  if (page === 0) {
    return (
      <div id="back">
        <div className="form-part">
          <div className="form-text">
          <h3>Welcome to Diet Unquiet! Please tell us about yourself</h3>
          <p id="info">
            Every field is optional, although filling it out will help us create
            the perfect program for you!
          </p>
          <form onSubmit={handleSubmit}>
            <label className="loginLabel">
              First Name:
              <input
                type="text"
                value={props.firstName}
                onChange={(e) => props.setFirstName(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Last Name:
              <input
                type="text"
                value={props.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
              />
            </label>
            <hr></hr>
            <label className="loginLabel">
              Enter your age:
              <input
                className="numberForm"
                type="number"
                value={props.age}
                onChange={(e) => props.setAge(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your gender:
              <label>
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  onChange={(e) => props.setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  onChange={(e) => props.setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  value="Other"
                  name="gender"
                  onChange={(e) => props.setGender(e.target.value)}
                />
                Other
              </label>
            </label>
            <hr></hr>
            <label className="loginLabel">
              Enter your weight (lbs):
              <input
                type="number"
                className="numberForm"
                value={props.weight}
                onChange={(e) => props.setWeight(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your height (in):
              <input
                type="number"
                className="numberForm"
                value={props.height}
                onChange={(e) => props.setHeight(e.target.value)}
              />
            </label>
            <input className="button" type="submit" value="Next" />
          </form>
          </div>
        </div>
      </div>
    );
  }
  if (page === 1) {
    return (
      <div id="back">
        <div className="form-part">
          <h3>Welcome to Diet Unquiet! Please tell us about yourself</h3>
          <p id="info">
            Every field is optional, although filling it out will help us create
            the perfect program for you!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="loginLabel">
              Any food allergies?
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
            </div>
            <hr></hr>
            <div className="loginLabel">
              Any current injuries that would prevent you from a certain
              exercise?
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
            </div>

            <input
              className="button"
              type="submit"
              onClick={handlePrevious}
              value="Previous"
              style={{ visibility: "visible" }}
            />
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default FirstTimeLogin;