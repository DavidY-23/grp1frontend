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
import Filter from "./components/Filter";
// Just added it here to test the mental health page
import MentalHealth from "./components/MentalHealth";
import JournalEntry from "./components/JournalEntry";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [injury, setInjury] = useState([]);
  const [userID, setUserID] = useState('')

  return (
    <div>
      <Routes>
        {/* Add routes/your page components here  */}
        <Route path="/home/:state" element={<HomePage firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route exact path="/" element={<WelcomePage firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route exact path="/About" element={<AboutPage />} />
        <Route exact path="/Contact" element={<ContactPage />} />
        <Route path="/CreateAccount" element={<CreateAccount firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/FirstTimeLogin" element={<FirstTimeLogin firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/LoginPage" element={<LoginPage firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/home/recipesearch/RecipeDetails/:state" element={<RecipeDetails firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/home/recipesearch/SearchResults" element={<SearchResults firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/RecipeCreate" element={<RecipeCreate firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path='/ParseR' element={<ParseR />} />
        <Route path="/MentalHealth" element={<MentalHealth firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/JournalEntry" element={<JournalEntry firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
        <Route path="/home/Filter" element={<Filter firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
      </Routes>
    </div>
  );
}

export default App;
