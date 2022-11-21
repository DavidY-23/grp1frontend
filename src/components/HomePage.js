import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Overview from "./Overview";
import RecipeSearch from "./RecipeSearch";
import ExerciseSearch from "./ExerciseSearch";
import Profile from "./Profile";
import { useParams, useNavigate } from "react-router-dom";

const renderContent = (props, state) => {
  switch (state) {
    case "overview":
      return (
        <Overview
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          age={props.age}
          setAge={props.setAge}
          gender={props.gender}
          setGender={props.setGender}
          weight={props.weight}
          setWeight={props.setWeight}
          height={props.height}
          setHeight={props.setHeight}
          allergies={props.allergies}
          setAllergies={props.setAllergies}
          injury={props.injury}
          setInjury={props.setInjury}
          userID={props.userID}
          setUserID={props.setUserID}
        />
      );
    case "profile":
      return (
        <Profile
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          age={props.age}
          setAge={props.setAge}
          gender={props.gender}
          setGender={props.setGender}
          weight={props.weight}
          setWeight={props.setWeight}
          height={props.height}
          setHeight={props.setHeight}
          allergies={props.allergies}
          setAllergies={props.setAllergies}
          injury={props.injury}
          setInjury={props.setInjury}
          userID={props.userID}
          setUserID={props.setUserID}
        />
      );
    case "recipesearch":
      return (
        <RecipeSearch
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          age={props.age}
          setAge={props.setAge}
          gender={props.gender}
          setGender={props.setGender}
          weight={props.weight}
          setWeight={props.setWeight}
          height={props.height}
          setHeight={props.setHeight}
          allergies={props.allergies}
          setAllergies={props.setAllergies}
          injury={props.injury}
          setInjury={props.setInjury}
          userID={props.userID}
          setUserID={props.setUserID}
        />
      );
    case "exercisesearch":
      return (
        <ExerciseSearch
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          age={props.age}
          setAge={props.setAge}
          gender={props.gender}
          setGender={props.setGender}
          weight={props.weight}
          setWeight={props.setWeight}
          height={props.height}
          setHeight={props.setHeight}
          allergies={props.allergies}
          setAllergies={props.setAllergies}
          injury={props.injury}
          setInjury={props.setInjury}
          userID={props.userID}
          setUserID={props.setUserID}
        />
      );
    default:
      return (
        <Overview
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          age={props.age}
          setAge={props.setAge}
          gender={props.gender}
          setGender={props.setGender}
          weight={props.weight}
          setWeight={props.setWeight}
          height={props.height}
          setHeight={props.setHeight}
          allergies={props.allergies}
          setAllergies={props.setAllergies}
          injury={props.injury}
          setInjury={props.setInjury}
          userID={props.userID}
          setUserID={props.setUserID}
        />
      );
  }
};

const HomePage = (props) => {
  const { state } = useParams();

  return (
    <div className="container-fluid main-page">
      <div className="row">
        <div className="col-2 nav-bar">
          <NavBar selected={state} />
        </div>
        <div className="col-10 main-content">{renderContent(props, state)}</div>
      </div>
    </div>
  );
};

export default HomePage;
