import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import db from './components/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import "bootstrap/dist/css/bootstrap.min.css";

// Import your components here
import CreateAccount from "./components/CreateAccount";
import FirstTimeLogin from "./components/FirstTimeLogin";
import WelcomePage from "./components/WelcomePage";
import ContactPage from "./components/Contact";
import AboutPage from "./components/About";
import HomePage from "./components/HomePage";
import RecipeDetails from "./components/RecipeDetails";
import ExerciseDetails from "./components/ExerciseDetails";
import SearchResults from "./components/SearchResultsPage";
import ExerciseSearchResults from "./components/ExerciseSearchResults";
import RecipeCreate from "./components/RecipeCreate.js";
import ParseR from "./components/Parse.js";
import Filter from "./components/Filter";
import ExerciseCreate from "./components/ExerciseCreate";
// Just added it here to test the mental health page
import MentalHealth from "./components/MentalHealth";
import JournalEntry from "./components/JournalEntry";

function App() {
  // All the states for the app
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
  const [part_checks, setpart_checks] = useState({
    Arms: false,
    Legs: false,
    Back: false,
    Chest: false,
  });
  const [exercises, setexercises] = useState([]);



  // Called only once since the second paramater(array) is empty 
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

  if (userID !== "") {
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
                  exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/"
            element={
              <WelcomePage
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
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
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/FirstTimeLogin"
            element={
              <FirstTimeLogin
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/recipesearch/RecipeDetails/:state"
            element={
              <RecipeDetails
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/recipesearch/SearchResults"
            element={
              <SearchResults
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/RecipeCreate"
            element={
              <RecipeCreate
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path='/ExerciseCreate'
            element={
              <ExerciseCreate
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/exercisesearch/ExerciseDetails/:state"
            element={
              <ExerciseDetails
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/exercisesearch/SearchResults"
            element={
              <ExerciseSearchResults
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route path="/ParseR" element={<ParseR />} />
          <Route
            path="/home/MentalHealth"
            element={
              <MentalHealth
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/MentalHealth/JournalEntry"
            element={
              <JournalEntry
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/Filter"
            element={
              <Filter
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
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
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route exact path="/About" element={<AboutPage exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
          <Route exact path="/Contact" element={<ContactPage exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID} />} />
          <Route
            path='/ExerciseCreate'
            element={
              <ExerciseCreate
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/CreateAccount"
            element={
              <CreateAccount
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/FirstTimeLogin"
            element={
              <FirstTimeLogin
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                exercises={exercises} setexercises={setexercises} part_checks={part_checks} setpart_checks={setpart_checks} exercise_data={exercise_data} setexercise_data={setexercise_data} data={data} setdata={setdata} filter_check={filter_check} setfilter_check={setfilter_check} allergy_check={allergy_check} set_allergycheck={set_allergycheck} ingredients_to_avoid={ingredients_to_avoid} set_ingredients_to_avoid={set_ingredients_to_avoid} ingredient_names={ingredient_names} set_ingredient_names={set_ingredient_names} filters={filters} setFilter={setFilter} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} age={age} setAge={setAge} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} allergies={allergies} setAllergies={setAllergies} injury={injury} setInjury={setInjury} userID={userID} setUserID={setUserID}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
