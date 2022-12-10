import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "./styles/LoginForm.css";
import { auth, provider } from "./firebase.js"
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import db from './firebase.js';
import GoogleButton from 'react-google-button'



function LoginForm(props, { Login, error }) {
  useEffect(() => {
    props.setUserID("");
    props.setFirstName("");
    props.setLastName("");
    props.setAge("");
    props.setGender("");
    props.setWeight("");
    props.setHeight("");
    props.setAllergies([]); 
    props.setInjury([]);
    props.setFilter([]);
    props.set_ingredients_to_avoid([]);
    props.setfilter_check(false);
    props.set_allergycheck(false);
    props.set_ingredient_names([]);
    props.setpart_checks({
      Arms: false,
      Legs: false,
      Back: false,
      Chest: false
    });
  }, []);

  console.log(props)
  /* global google */
  const [details, setDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // Login(details);


    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const docRef = doc(db, "Users", user.uid);
        getDoc(docRef)
          .then((doc) => {
            const userData = doc.data();
            // console.log(doc.data(), doc.id, doc.data()["age"])
            props.setUserID(user.uid);
            props.setFirstName(userData["firstName"]);
            props.setLastName(userData["lastName"]);
            props.setAge(userData["age"]);
            props.setGender(userData["gender"]);
            props.setWeight(userData["weight"]);
            props.setHeight(userData["height"]);
            props.setAllergies(userData["allergies"]);
            props.setInjury(userData["injury"]);
            props.setFilter(userData["filters"]);
            props.set_ingredients_to_avoid(userData["ingredients_to_avoid"]);
            props.setfilter_check(userData["filter_check"]);
            props.set_allergycheck(userData["allergy_check"]);
            props.set_ingredient_names(userData["ingredient_names"]);
            props.setpart_checks(userData["part_checks"]);
            navigate("/home/profile");
          })
        console.log("signed in user", user.uid);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + errorMessage)
      });
  };

  function googleSignIn(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // const details = getAdditionalUserInfo(result);
    console.log(details.isNewUser);
    if (getAdditionalUserInfo(result).isNewUser){
      console.log("new user")
      createAccount(user)
      
    }
    else{
      console.log("existing user")
      const docRef = doc(db, "Users", user.uid);
        getDoc(docRef)
          .then((doc) => {
            const userData = doc.data();
            // console.log(doc.data(), doc.id, doc.data()["age"])
            props.setUserID(user.uid);
            props.setFirstName(userData["firstName"]);
            props.setLastName(userData["lastName"]);
            props.setAge(userData["age"]);
            props.setGender(userData["gender"]);
            props.setWeight(userData["weight"]);
            props.setHeight(userData["height"]);
            props.setAllergies(userData["allergies"]);
            props.setInjury(userData["injury"]);
            props.setFilter(userData["filters"]);
            props.set_ingredients_to_avoid(userData["ingredients_to_avoid"]);
            props.setfilter_check(userData["filter_check"]);
            props.set_allergycheck(userData["allergy_check"]);
            props.set_ingredient_names(userData["ingredient_names"]);
            props.setpart_checks(userData["part_checks"]);
            navigate("/home/profile");
          })
    }
  
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  async function createAccount(user) {
    try {
        const newDocument = await setDoc(doc(db, 'Users', user.uid), {
            uniqueId: user.uid,
            userEmail: user.email,
        });

        // For Jounral Entry 
        const newDocForJorunalEntry = await setDoc(doc(db, 'JournalEntry', user.uid), {
            id: user.uid,
            userEmail: user.email,
            entries: [{title: "Enter Title", entry: "Entry Here"},]
        });
        
        navigate('/FirstTimeLogin');
        props.setUserID(user.uid);
    } catch (error) {
        console.log(error.code + error.message);
        alert(error.message);
    }
}
  


  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "798847889156-58edh3an3ork1i4uh6c9f5rktprk3fgk.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  // function SetEmail(email) {
  //   document.getElementById("email").setAttribute("value", email);
  // }
  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID Token: " + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setDetails({ ...details, email: userObject.email });
  // }


  return (
    <form id="LogForm" onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        {error != "" ? <div className="error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <input type="submit" value="LOGIN" />
        {/* <a href="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1">SIGN UP</a> */}
        <Link to="/CreateAccount" id="Signup">
          SIGN UP
        </Link>
        <GoogleButton onClick={(googleSignIn)}/>
        <div id="signInDiv"></div>
      </div>
    </form>
  );
}

export default LoginForm;
