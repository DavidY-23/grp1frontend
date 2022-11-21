import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./styles/Profile.css";
import profilepic from "../images/defaultpic.jpg";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function RenderContent() {
  //Temporary way to demostrate form until we have backend working
  const location = useLocation();
  let BMI =
    "BMI " +
    (
      (location.state?.weight /
        (location.state?.height * location.state?.height)) *
      703
    ).toFixed(1);
  if (
    location.state?.height === undefined &&
    location.state?.height === undefined
  ) {
    BMI = "BMI N/A";
  }
  const feet = Math.floor(location.state?.height / 12);
  const inches = location.state?.height % 12;
  let height = feet + "ft " + inches + " inches";
  if (location.state?.height === undefined) {
    height = "Height N/A";
  }

  let injuries = "";
  for (let i = 0; i < location.state?.injury.length; i++) {
    injuries += location.state?.injury[i] + " ";
  }
  if (location.state?.injury.length === undefined) {
    injuries = "None";
  }

  let allergies = "";
  for (let i = 0; i < location.state?.allergies.length; i++) {
    allergies += location.state?.allergies[i] + " ";
  }
  if (location.state?.allergies.length === undefined) {
    allergies = "None";
  }

  let name = location.state?.firstName + " " + location.state?.lastName;
  if (
    location.state?.firstName === undefined &&
    location.state?.lastName === undefined
  ) {
    name = "Name N/A";
  }

  let weight = location.state?.weight + " lbs";
  if (location.state?.weight === undefined) {
    weight = "Weight N/A";
  }

  let age = location.state?.age + " years old";
  if (location.state?.age === undefined) {
    age = "Age N/A";
  }

  let gender = location.state?.gender;
  if (location.state?.gender === undefined) {
    gender = "Gender N/A";
  }

  let navigate = useNavigate();
  const redirect = () => {
    let path = "/home/overview";
    navigate(path);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 centered-content">
          {name}
          <br />
          {weight}
          <br />
          {BMI}
          <br />
        </div>
        <div className="col-4 centered-content">
          <img src={profilepic} alt=""></img>
        </div>
        <div className="col-4 centered-content">
          {age}
          <br />
          {gender}
          <br />
          Allergies: {allergies} <br />
          Current injuries: {injuries}
        </div>
      </div>
      <row>
        <div className="col-12 centered-content">
          <button className="" onClick={redirect}>
            {" "}
            Edit Profile{" "}
          </button>
        </div>
      </row>
    </div>
  );
}

function Profile() {
  return (
    <div className="container-fluid main-page">
      <div className="row">
        <div className="col-2 nav-bar">
          <NavBar selected={"profile"} />
        </div>
        <div className="col-10 main-content">{RenderContent()}</div>
      </div>
    </div>
  );
}

export default Profile;
