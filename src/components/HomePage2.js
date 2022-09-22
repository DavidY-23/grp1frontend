import React from "react";
import NavBar from "./NavBar";
import Overview from "./Overview";
import RecipeSearch from "./RecipeSearch";
import ExerciseSearch from "./ExerciseSearch";
import Profile from "./Profile";
import { useParams } from "react-router-dom";

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
      return <Overview />;
  }
};

const HomePage2 = (props) => {
  const { state } = useParams();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <NavBar selected={state} />
        </div>
        <div className="col-9">{renderContent(state)}</div>
      </div>
    </div>
  );
};

export default HomePage2;
