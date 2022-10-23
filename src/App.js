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
import RecipeDetails from "./components/RecipeDetails";
import SearchResults from "./components/SearchResultsPage";
import RecipeCreate from "./components/RecipeCreate.js";
import ParseR from "./components/Parse.js";

// Just added it here to test the mental health page
import MentalHealth  from "./components/MentalHealth";
import JournalEntry from "./components/JournalEntry";

function App() {
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
        <Route path="/home/recipesearch/RecipeDetails/:state" element={<RecipeDetails />} />
        <Route path="/home/recipesearch/SearchResults" element={<SearchResults />} />
        <Route path="/RecipeCreate" element={<RecipeCreate />} />
        <Route path = '/ParseR' element={<ParseR/>} />
        <Route path="/MentalHealth" element={<MentalHealth />} />
        <Route path="/JournalEntry" element={<JournalEntry />} />
      </Routes>
    </div>
  );
}

export default App;
