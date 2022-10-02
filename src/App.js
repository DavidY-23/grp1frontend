import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

// Import your components here
import CreateAccount from "./components/CreateAccount";
import FirstTimeLogin from "./components/FirstTimeLogin";
import WelcomePage from "./components/WelcomePage";
import ContactPage from "./components/Contact";
import AboutPage from "./components/About";
import HomePage from "./components/HomePage";
import Profile from './components/Profile';
import ExerciseSearch from './components/ExerciseSearch.js';
import RecipeSearch from "./components/RecipeSearch.js";
import axios from 'axios'

function App() {
  // const [api, setapi] = useState(null);
  // const APP_ID = "1835a421";
  // const APP_KEY = "af382678c70f9ed773f2eb9c921ba7ae";
  
  // //Loading API data
  // useEffect(() => {
  //   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
  //     .then(res => res.json())
  //     .then(result => {
  //       setapi(result); //Storing API in our own variable
  //       console.log(result);
  //       console.log(api);
  //     })
  //   // axios.get('https://moj-api.herokuapp.com/debits')
  //   // axios.get('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
  //   //   .then(res => {
  //   //     console.log(res)
  //   //     setapi(res.data)
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err)
  //   //   })
  //   //   console.log(api);
  //   // getRecipes();
  // }, []);
  // console.log(api);
  return (
    <div>
      <Routes>
        {/* Add routes/your page components here  */}
        <Route path="/home/:state" element={<HomePage />} />
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/About" element={<AboutPage />} />
        <Route exact path="/Contact" element={<ContactPage />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/FirstTimeLogin" element={<FirstTimeLogin />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ExerciseSearch" element={<ExerciseSearch />} />
        <Route path="/RecipeSearch" element={<RecipeSearch />} />
      </Routes>
    </div>
  );
}

export default App;
