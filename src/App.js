import React from "react";
import { Routes, Route} from "react-router-dom";
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

function App() {
  /* global google */
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
          <Route path="/ExerciseSearch" element={<ExerciseSearch/>}/>
          <Route path="/RecipeSearch" element={<RecipeSearch/>}/>
        </Routes>
    </div>
  );
}

export default App;
