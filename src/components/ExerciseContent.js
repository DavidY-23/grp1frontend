import React from "react";
import NavBar from "./NavBar";
import armsPic from "../images/Arms.png";

const renderContent = () => {
  return (
    <div>
      <div>Title</div>
      <img src={armsPic} />
      <div>Content</div>
    </div>
  );
};

const ExerciseContent = () => {
  return (
    <div className="container-fluid main-page">
      <div className="row">
        <div className="col-2 nav-bar">
          <NavBar selected={"exercise"} />
        </div>
        <div className="col-10 main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ExerciseContent;
