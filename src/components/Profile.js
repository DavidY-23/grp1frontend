import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./styles/Profile.css";
import profilepic from "../images/defaultpic.jpg";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  //Temporary way to demostrate form until we have backend working

  console.log(props)
  let BMI =
    "BMI " +
    (
      (props?.weight /
        (props?.height * props?.height)) *
      703
    ).toFixed(1);
  if (
    props?.height === undefined &&
    props?.height === undefined
  ) {
    BMI = "BMI N/A";
  }
  const feet = Math.floor(props?.height / 12);
  const inches = props?.height % 12;
  let height = feet + "ft " + inches + " inches";
  if (props?.height === undefined) {
    height = "Height N/A";
  }

  let injuries = "";
  for (let i = 0; i < props?.injury.length; i++) {
    injuries += props?.injury[i] + " ";
  }
  if (props?.injury.length === undefined) {
    injuries = "None";
  }

  let allergies = "";
  for (let i = 0; i < props?.allergies.length; i++) {
    allergies += props?.allergies[i] + " ";
  }
  if (props?.allergies.length === undefined) {
    allergies = "None";
  }

  let name = props?.firstName + " " + props?.lastName;
  if (
    props?.firstName === undefined &&
    props?.lastName === undefined
  ) {
    name = "Name N/A";
  }

  let weight = props?.weight + " lbs";
  if (props?.weight === undefined) {
    weight = "Weight N/A";
  }

  let age = props?.age + " years old";
  if (props?.age === undefined) {
    age = "Age N/A";
  }

  let gender = props?.gender;
  if (props?.gender === undefined) {
    gender = "Gender N/A";
  }

  let navigate = useNavigate();
  const redirect = () => {
    let path = "/home/overview";
    navigate(path);
  };
  return (
    <div className="profile">
      <div className="profileGrid">
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            {name}
            <br></br>
            {weight}
            <br></br>
            {height} <br></br>
            {BMI} <br></br>
          </Grid>
          <Grid item>
            <img src={profilepic} alt=""></img>
          </Grid>
          <Grid item>
            {age}
            <br></br>
            {gender}
            <br></br>
            Allergies: {allergies} <br></br>
            Current injuries: {injuries}
          </Grid>
        </Grid>
      </div>
      <button className="edit" onClick={redirect}>
        {" "}
        Edit Profile{" "}
      </button>
    </div>
  );
}

export default Profile;
