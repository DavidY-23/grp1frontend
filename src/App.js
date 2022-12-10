import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { auth } from "./components/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import db from "./components/firebase.js";
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

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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
  const [exercise_dict, setexercise_dict] = useState([]);

  useEffect(() => {
    const uidCookie = getCookie("userid");
    if (uidCookie) {
      try {
        const docRef = doc(db, "Users", uidCookie);
        getDoc(docRef).then((doc) => {
          const userData = doc.data();
          setUserID(uidCookie);
          setFirstName(userData["firstName"]);
          setLastName(userData["lastName"]);
          setAge(userData["age"]);
          setGender(userData["gender"]);
          setWeight(userData["weight"]);
          setHeight(userData["height"]);
          setAllergies(userData["allergies"]);
          setInjury(userData["injury"]);
          //console.log("user dater " + JSON.stringify(userData));
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + errorMessage);
      }
    }
  }, []);

  //console.log(userID);

  // Called only once since the second paramater(array) is empty
  useEffect(() => {
    collectData();
    collectExercise();
    // console.log(data);
    // console.log(exercise_data);
    // console.log(exercise_dict);
  }, []);

  async function collectData() {
    const recipes_list = doc(db, "Recipes", "RecipeArray");
    const recipe_snap = await getDoc(recipes_list);
    //console.log(recipe_snap.data().Recipes);
    setdata(recipe_snap.data().Recipes);
  }

  async function collectExercise() {
    const exer = doc(db, "Exercises", "ExerciseArray");
    const ex_doc = await getDoc(exer);
    setexercise_data(ex_doc.data().Exercises);

    //Create a new dictionary for exercises
    var exDict = [];

    //For every exercise in the array
    ex_doc.data().Exercises.forEach((exer) => {
      // Split the name into individual words
      const check = exer.Name.split(" ");

      // For every word in the exercise name
      check.forEach((wor) => {
        if (wor !== "") {
          // Ignore the spaces
          const low = wor.toLowerCase();
          // Only add new words to the dictionary
          if (!exDict.includes(low)) {
            exDict.push(low);
          }
        }
      });

      setexercise_dict(exDict);
    });
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
                  exercise_dict={exercise_dict}
                  exercises={exercises}
                  setexercises={setexercises}
                  part_checks={part_checks}
                  setpart_checks={setpart_checks}
                  exercise_data={exercise_data}
                  setexercise_data={setexercise_data}
                  data={data}
                  setdata={setdata}
                  filter_check={filter_check}
                  setfilter_check={setfilter_check}
                  allergy_check={allergy_check}
                  set_allergycheck={set_allergycheck}
                  ingredients_to_avoid={ingredients_to_avoid}
                  set_ingredients_to_avoid={set_ingredients_to_avoid}
                  ingredient_names={ingredient_names}
                  set_ingredient_names={set_ingredient_names}
                  filters={filters}
                  setFilter={setFilter}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  age={age}
                  setAge={setAge}
                  gender={gender}
                  setGender={setGender}
                  weight={weight}
                  setWeight={setWeight}
                  height={height}
                  setHeight={setHeight}
                  allergies={allergies}
                  setAllergies={setAllergies}
                  injury={injury}
                  setInjury={setInjury}
                  userID={userID}
                  setUserID={setUserID}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/"
            element={
              <WelcomePage
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route path="*" element={<Navigate to="/home/overview" replace />} />
          <Route exact path="/About" element={<AboutPage />} />
          <Route exact path="/Contact" element={<ContactPage />} />
          <Route
            path="/CreateAccount"
            element={
              <CreateAccount
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/FirstTimeLogin"
            element={
              <FirstTimeLogin
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/recipesearch/RecipeDetails/:state"
            element={
              <RecipeDetails
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/recipesearch/SearchResults"
            element={
              <SearchResults
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/RecipeCreate"
            element={
              <RecipeCreate
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/ExerciseCreate"
            element={
              <ExerciseCreate
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/exercisesearch/ExerciseDetails/:state"
            element={
              <ExerciseDetails
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/exercisesearch/SearchResults"
            element={
              <ExerciseSearchResults
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route path="/ParseR" element={<ParseR />} />
          <Route
            path="/home/MentalHealth"
            element={
              <MentalHealth
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/MentalHealth/JournalEntry"
            element={
              <JournalEntry
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/home/Filter"
            element={
              <Filter
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
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
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            exact
            path="/About"
            element={
              <AboutPage
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            exact
            path="/Contact"
            element={
              <ContactPage
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/ExerciseCreate"
            element={
              <ExerciseCreate
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/CreateAccount"
            element={
              <CreateAccount
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/FirstTimeLogin"
            element={
              <FirstTimeLogin
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                exercise_dict={exercise_dict}
                exercises={exercises}
                setexercises={setexercises}
                part_checks={part_checks}
                setpart_checks={setpart_checks}
                exercise_data={exercise_data}
                setexercise_data={setexercise_data}
                data={data}
                setdata={setdata}
                filter_check={filter_check}
                setfilter_check={setfilter_check}
                allergy_check={allergy_check}
                set_allergycheck={set_allergycheck}
                ingredients_to_avoid={ingredients_to_avoid}
                set_ingredients_to_avoid={set_ingredients_to_avoid}
                ingredient_names={ingredient_names}
                set_ingredient_names={set_ingredient_names}
                filters={filters}
                setFilter={setFilter}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                allergies={allergies}
                setAllergies={setAllergies}
                injury={injury}
                setInjury={setInjury}
                userID={userID}
                setUserID={setUserID}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
