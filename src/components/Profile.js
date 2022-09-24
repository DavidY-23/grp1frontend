import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./styles/Profile.css";
import profilepic from "../images/defaultpic.jpg";
import { useNavigate } from 'react-router-dom';


function Profile() {
  //Temporary way to demostrate form until we have backend working
  const location = useLocation();
  const BMI = (
    (location.state?.weight /
      (location.state?.height * location.state?.height)) *
    703
  ).toFixed(1);
  const feet = Math.floor(location.state?.height / 12);
  const inches = location.state?.height % 12;
  let navigate = useNavigate()
  const redirect = () =>
  {
    let path = '/home/overview';
    navigate(path);
  }
  console.log(location.state?.allergies);
  return (
    <div className="profile">
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          {location.state?.weight} lbs<br></br>
          {feet} ft {inches} inches<br></br>
          BMI: {BMI}
          <br></br>
        </Grid>
        <Grid item>
          <img src={profilepic} alt=""></img>
        </Grid>
        <Grid item>
          {location.state?.name}
          <br></br>
          {location.state?.age} years old<br></br>
          {location.state?.gender}
          {location.state?.allergies}
          {location.state?.injury}
        </Grid>
      </Grid>
      <button className='edit' onClick={redirect} > Edit Profile </button>
    </div>
  );
}

export default Profile;
