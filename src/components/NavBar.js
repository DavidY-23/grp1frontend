import React from "react";
import "./styles/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "./firebase.js"
import { signOut } from 'firebase/auth';
import db from './firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';


//to do: code clarity can be improved
const NavBar = (props) => {
  const [fname, setFirstName] = useState(props.firstName);
  const [lname, setLastName] = useState(props.lastName);
  const [userage, setAge] = useState(props.age);
  const [usergender, setGender] = useState(props.gender);
  const [userweight, setWeight] = useState(props.weight);
  const [userheight, setHeight] = useState(props.height);
  const [userallergies, setAllergies] = useState(props.allergies);
  const [userinjury, setInjury] = useState(props.injury);
  const [userfilters, setFilter] = useState(props.filters);
  const [useringredient_names, set_ingredient_names] = useState(props.ingredient_names);
  const [useringredients_to_avoid, set_ingredients_to_avoid] = useState(props.ingredients_to_avoid);
  const [userfilter_check, setfilter_check] = useState(props.filter_check);
  const [userallergy_check, set_allergycheck] = useState(props.allergy_check);
  const [id, setUserID] = useState(props.userID);

  const [userpart_checks, setpart_checks] = useState({
    Arms: false,
    Legs: false,
    Back: false,
    Chest: false,
  });
  function logout() {
    signOut(auth).then(() => {
      console.log(props);
      try {
        console.log("logout button clicked");
        props.setUserID("");
        props.setFirstName("");
        props.setLastName("");
        props.setAge("");
        props.setGender("");
        props.setWeight("");
        props.setHeight("");
        props.setAllergies([]);
        props.setInjury([]);
        props.setFilter([]);
        props.set_ingredients_to_avoid([]);
        props.setfilter_check(false);
        props.set_allergycheck(false);
        props.set_ingredient_names([]);
        props.setpart_checks({
          Arms: false,
          Legs: false,
          Back: false,
          Chest: false
        });
        setDoc(doc(db, "Users", props.userID), {
          uniqueId: id,
          firstName: fname,
          lastName: lname,
          age: userage,
          gender: usergender,
          weight: userweight,
          height: userheight,
          allergies: userallergies,
          injury: userinjury,
          filters: userfilters,
          ingredient_names: useringredient_names,
          ingredients_to_avoid: useringredients_to_avoid,
          filter_check: userfilter_check,
          allergy_check: userallergy_check,
          part_checks: userpart_checks,
        });
      }
      catch (error) {
        console.log(error.code + error.message);
        alert(error.message);
      }

    }).catch((error) => {
      console.log("logout failed");
    })
    console.log(props.firstName);
  }

  return (
    <div className="container-fluid sticky-top side-nav-bar">
      <div className="row">
        <Link to="/home/overview">
          <div
            className={props.selected === "overview" ? "selected-nav-tab" : ""}
          >
            Overview
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/profile">
          <div
            className={props.selected === "profile" ? "selected-nav-tab" : ""}
          >
            Profile
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/recipesearch">
          <div
            className={
              props.selected === "recipesearch" ? "selected-nav-tab" : ""
            }
          >
            Recipe Search
          </div>
        </Link>
      </div>
      <div className="row">
        <Link to="/home/exercisesearch">
          <div
            className={
              props.selected === "exercisesearch" ? "selected-nav-tab" : ""
            }
          >
            Exercise Search
          </div>
        </Link>
        <Link to="/home/locator">
          <div
            className={props.selected === "locator" ? "selected-nav-tab" : ""}
          >
            Locator
          </div>
        </Link>
        <Link to="/home/MentalHealth">
          <div
            className={props.selected === "MentalHealth" ? "selected-nav-tab" : ""}
          >
            Mental Health
          </div>
          </Link>
          <Link to="/home/calorie">
          <div
            className={props.selected === "calorie" ? "selected-nav-tab" : ""}
          >
            Calorie
          </div>
        </Link>
        {/* <Link to="/">
          <div onClick={() => { logout() }}
            className={props.selected === "locator" ? "selected-nav-tab" : ""}
          >
            Logout
          </div>
        </Link> */}

      </div>
      <div className="row">
        <Link to="/">
          <div onClick={() => { logout() }}
            className="log-out"
          >
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
