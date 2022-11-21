import React from "react";
import NavBar from "./NavBar";
import Overview from "./Overview";
import RecipeSearch from "./RecipeSearch";
import ExerciseSearch from "./ExerciseSearch";
import Profile from "./Profile";
import { useParams, Navigate } from "react-router-dom";

const renderContent = (state) => {
  switch (state) {
    case "overview":
      return <Overview />;
    case "profile":
      return <Profile />;
    case "recipesearch":
      return <RecipeSearch />;
    case "exercisesearch":
      return <ExerciseSearch />;
    default:
      return <Navigate to="/home/overview" replace />;
  }
};

const HomePage = (props) => {
  let params = useParams();
  const state = params.state;
  const content = params.content;
  console.log(state + " " + content);
  return (
    <div className="container-fluid main-page">
      <div className="row">
        <div className="col-2 nav-bar">
          <NavBar selected={state} />
        </div>
        <div className="col-10 main-content">{renderContent(state)}</div>
      </div>
    </div>
  );
};

export default HomePage;
