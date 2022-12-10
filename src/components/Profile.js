import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./styles/Profile.css";
import profilepic from "../images/defaultpic.jpg";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { map } from "@firebase/util";

function Profile(props) {
  //Temporary way to demostrate form until we have backend working

  // console.log(props)
  // let BMI =
  //   "BMI " +
  //   (
  //     (props??.weight /
  //       (props??.height * props??.height)) *
  //     703
  //   ).toFixed(1);
  // if (
  //   props??.height === undefined &&
  //   props??.height === undefined
  // ) {
  //   BMI = "BMI N/A";
  // }
  // const feet = Math.floor(props??.height / 12);
  // const inches = props??.height % 12;
  // let height = feet + "ft " + inches + " inches";
  // if (props??.height === undefined) {
  //   height = "Height N/A";
  // }

  // let injuries = "";
  // for (let i = 0; i < props??.injury.length; i++) {
  //   injuries += props??.injury[i] + " ";
  // }
  // if (props??.injury.length === undefined) {
  //   injuries = "None";
  // }

  // let allergies = "";
  // for (let i = 0; i < props??.allergies.length; i++) {
  //   allergies += props??.allergies[i] + " ";
  // }
  // if (props??.allergies.length === undefined) {
  //   allergies = "None";
  // }

  // let name = props??.firstName + " " + props??.lastName;
  // if (
  //   props??.firstName === undefined &&
  //   props??.lastName === undefined
  // ) {
  //   name = "Name N/A";
  // }

  // let weight = props??.weight + " lbs";
  // if (props??.weight === undefined) {
  //   weight = "Weight N/A";
  // }

  // let age = props??.age + " years old";
  // if (props??.age === undefined) {
  //   age = "Age N/A";
  // }

  // let gender = props??.gender;
  // if (props??.gender === undefined) {
  //   gender = "Gender N/A";
  // }

  let navigate = useNavigate();
  const redirect = () => {
    let path = "/home/overview";
    navigate(path);
  };


  const HeightRow = ({ heightInInches }) => {
    if (!heightInInches) return <span>Height : N/A</span>;

    const feet = Math.trunc(props?.height / 12);
    const inches = props?.height % 12;

    return <span>Height : {feet}' {inches}"</span>
  };

  const WeightRow = ({ weightInPounds }) => {
    return <span>Weight : {!weightInPounds ? 'N/A' : `${weightInPounds} lbs`}</span>

  }

  const BMI = ({ heightInInches, weightInPounds }) => {
    if (!heightInInches || !weightInPounds) return <span>BMI : N/A</span>

    const bmi = 703 * props?.weight / (props?.height ** 2);
    return <span>BMI : {bmi.toFixed(1)}</span>
  }

  return (
    <div className="profile">
      <div className="banner">
        <div style={{ display: "flex", gap: '1rem' }}>
          <img src={profilepic} className='user-icon' />
          <div className="banner-left-container">
            <span className="username">{props?.firstName} {props?.lastName}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <HeightRow heightInInches={props?.height} />
              <WeightRow weightInPounds={props?.weight} />
              <BMI heightInInches={props?.height} weightInPounds={props?.weight} />
            </div>
          </div>
        </div>
        <div className="banner-right-container">
          <IconButton onClick={redirect} style={{ padding: 0 }}>
            <EditIcon style={{ color: 'white', fontSize: '1.5rem' }} />
          </IconButton>
          <div>
            {!!props?.age && <span>{props?.age} y.o.</span>}
            {!!props?.gender && <span>
              {props?.gender === 'Male' && '♂'}
              {props?.gender === 'Female' && '♀'}
              {props?.gender === 'Other' && '⚧'}
            </span>}
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className='body-box'>
          <div style={{ display: 'flex' }}>
            Allergies: {
              (props?.injuries && !!props?.injuries.length)
              ? props?.allergies.map((allergy, idx) => {
                  return <span key={`${allergy}-${idx}`}>
                    {allergy}
                    {idx != props?.allergies.length-1 && ", "}
                  </span>
                }) :
                "none"}
          </div>
          <div style={{ display: 'flex' }}>
            Injuries: {
              (props?.injuries && !!props?.injuries.length)
                ? props?.injuries.map((injuries, idx) => {
                  return <span key={`${injuries}-${idx}`}>
                    {injuries}
                    {idx != props?.injuries.length-1 && ", "}
                  </span>
                }) :
                "none"}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Profile;
