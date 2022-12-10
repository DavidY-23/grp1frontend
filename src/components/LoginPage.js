import { useState } from 'react';
import LoginForm from './LoginForm';

function LoginPage(props) {
  /* global google */
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == "cw191wc@gmail.com") {
      // console.log("Logged in");
      setError("");
      setUser({
        email: details.email
      });
    }
    else if (details.email == adminUser.email && details.password == adminUser.password) {
      // console.log("Logged in");
      setError("");
      setUser({
        email: details.email
      });
    }
    else {
      // console.log("Details do not match");
      setError("Details do not match");
    }
  }

  const Logout = () => {
    // console.log("Logout");

    setUser({ email: "" });
  }

  return (
    <div className="Login">
      {(user.email == "") ? (
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
      ) : (<LoginForm exercise_dict={props.exercise_dict} exercises={props.exercises} setexercises={props.setexercises} part_checks={props.part_checks} setpart_checks={props.setpart_checks} exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID} Login={Login} error={error} />
      )}

    </div>
  );
}

export default LoginPage;