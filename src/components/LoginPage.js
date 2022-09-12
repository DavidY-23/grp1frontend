import { useState } from 'react';
import LoginForm from './LoginForm';

function LoginPage() {
    /* global google */
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }
    
    const [user, setUser] = useState({email: ""});
    const [error, setError] = useState("");

    const Login = details => {
      console.log(details);

      if(details.email == "cw191wc@gmail.com") {
        console.log("Logged in");
        setError("");
        setUser({
          email: details.email
        });
      }
      else if(details.email == adminUser.email && details.password == adminUser.password) {
        console.log("Logged in");
        setError("");
        setUser({
          email: details.email
        });
      }
      else {
        console.log("Details do not match");
        setError("Details do not match");
      }
    }

    const Logout = () => {
      console.log("Logout");

      setUser({email: ""});
    }
    
  return (
    <div className="Login">
      
      { (user.email == "") ? (
        <div className="LoginPage">
            <h1>Diet Unquiet</h1>
        </div>
      ) : (<h2></h2>)
      }

      {(user.email != "") ? (
        <div className="Hello">
          <h2>Welcome, <span>{user.email}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (<LoginForm Login={Login} error={error}/>
      )}

      </div> 
  );
}

export default LoginPage;