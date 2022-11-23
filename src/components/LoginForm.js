import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/LoginForm.css";
import { auth } from "./firebase.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js"

function LoginForm(props, { Login, error }) {
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
        
        navigate("/home/profile",
          {
            state: {                    //temporary values for passing state
              userUID : user.uid,
              firstName: "joe",
              lastName: "mama",
              age: "",
              gender: "",
              weight: "",
              height: "",
              allergies: "",
              injury: "",
            }
          }
        );
        console.log("signed in user", user.uid);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode + errorMessage)
        });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "798847889156-58edh3an3ork1i4uh6c9f5rktprk3fgk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  function SetEmail(email) {
    document.getElementById("email").setAttribute("value", email);
  }
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setDetails({ ...details, email: userObject.email });
  }


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

        <div id="signInDiv"></div>
      </div>
    </form>
  );
}

export default LoginForm;
