import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import db from './components/firebase.js';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
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
  const [filters, setFilter] = useState([]);
  const [ingredient_names, set_ingredient_names] = useState([]);
  const [ingredients_to_avoid, set_ingredients_to_avoid] = useState([]);
  const [filter_check, setfilter_check] = useState(false);
  const [allergy_check, set_allergycheck] = useState(false);
  const [userID, setUserID] = useState("");
  const [data, setdata] = useState([]);
  const [exercise_data, setexercise_data] = useState([]);

  useEffect(() => {
    collectData();
    collectExercise();
    console.log(data);
    console.log(exercise_data);
  }, []);

  async function collectData() {
    const recipes_list = doc(db, "Recipes", "RecipeArray");
    const recipe_snap = await getDoc(recipes_list);
    console.log(recipe_snap.data().Recipes);
    setdata(recipe_snap.data().Recipes);
  }

  async function collectExercise() {
    const exer = doc(db, "Exercises", "ExerciseArray");
    const ex_doc = await getDoc(exer);
    setexercise_data(ex_doc.data().Exercises);
  }

  if (userID != "") {
    return (
      <div>
        <Routes>
          {/* Add routes/your page components here  */}
          <Route path="/home">
            <Route index element={<Navigate to="/home/overview" replace />} />
            <Route
              path=":state"
              element={
                <HomePage
                  exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/"
            element={
              <WelcomePage
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route exact path="/About" element={<AboutPage />} />
          <Route exact path="/Contact" element={<ContactPage />} />
          <Route
            path="/CreateAccount"
            element={
              <CreateAccount
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/FirstTimeLogin"
            element={
              <FirstTimeLogin
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/recipesearch/RecipeDetails/:state"
            element={
              <RecipeDetails
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/recipesearch/SearchResults"
            element={
              <SearchResults
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/RecipeCreate"
            element={
              <RecipeCreate
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route path="/ParseR" element={<ParseR />} />
          <Route
            path="/MentalHealth"
            element={
              <MentalHealth
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/JournalEntry"
            element={
              <JournalEntry
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/Filter"
            element={
              <Filter
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          {/* Add routes/your page components here  */}
          <Route
            exact
            path="/"
            element={
              <WelcomePage
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route exact path="/About" element={<AboutPage />} />
          <Route exact path="/Contact" element={<ContactPage />} />
          <Route
            path="/CreateAccount"
            element={
              <CreateAccount
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/FirstTimeLogin"
            element={
              <FirstTimeLogin
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
