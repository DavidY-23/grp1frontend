import "./styles/FirstTimeLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FirstTimeLogin() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [page, setPage] = useState(0);
  const [allergies, setAllergies] = useState([]);
  const [injury, setInjury] = useState([]);
  const [checked, setChecked] = useState(false);

  const handlePrevious = () => {
    setPage(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (page === 0) {
      setPage(1);
      return;
    }
    if (page === 1)
      navigate("/home/profile", {
        state: {
          firstName: firstName,
          lastName: lastName,
          age: age,
          gender: gender,
          weight: weight,
          height: height,
          allergies: allergies,
          injury: injury,
        },
      });
  };

  const handleAllergy = async (event) => {
    if (event.target.checked) {
      setAllergies((oldArray) => [...oldArray, event.target.value]);
    } else {
      setAllergies((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      );
    }
  };

  const handleInjury = async (event) => {
    if (event.target.checked) {
      setInjury((oldArray) => [...oldArray, event.target.value]);
    } else {
      setInjury((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      );
    }
  };

  const genderFunction = (event) => {
    if(event.target.checked) {
        setGender(event.target.value)
        setChecked(true)
    }
    else {
       setChecked(true)
    }
  }

  if (page === 0) {
    return (
      <div id="back">
        <div className="form-part">
          <h3>Welcome to Diet Unquiet! Please tell us about yourself</h3>
          <p id="info">Every field is optional, although filling it out will help us create the perfect program for you!</p>
          <form onSubmit={handleSubmit}>

          <label className="loginLabel">
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </label>
            <label className="loginLabel">
            Last Name:

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
            <hr></hr>
            <label className="loginLabel">
              Enter your age:
              <input
                className="numberForm"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your gender:
              <label>
                <input
                type="radio"
                value="Male"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />
                Male
              </label>
              <label>
                <input
                type="radio"
                value="Female"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />
                Female
              </label>
              <label>
                <input
                type="radio"
                value="Other"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />
                Other
              </label>
            </label>
            <hr></hr>
            <label className="loginLabel">
              Enter your weight (lbs):
              <input
                type="number"
                className="numberForm"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your height (in):
              <input
                type="number"
                className="numberForm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
            <input className="button" type="submit" value="Next" />
          </form>
        </div>
      </div>
    );
  }
  if (page === 1) {
    return (
      <div id="back">
        <div className="form-part">
          <h3>Welcome to Diet Unquiet! Please tell us about yourself</h3>
          <p id="info">Every field is optional, although filling it out will help us create the perfect program for you!</p>
          <form onSubmit={handleSubmit}>
            <div className="loginLabel">
              Any food allergies?
              <label>
                <input
                  type="checkbox"
                  value="Milk"
                  name="Milk"
                  id="Milk"
                  onChange={handleAllergy}
                />
                Milk
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Nuts"
                  name="Nuts"
                  id="Nuts"
                  onChange={handleAllergy}
                />
                Nuts
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Eggs"
                  name="Eggs"
                  id="Eggs"
                  onChange={handleAllergy}
                />
                Eggs
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Fish"
                  name="Fish"
                  id="Fish"
                  onChange={handleAllergy}
                />
                Fish
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Wheat"
                  name="Wheat"
                  id="Wheat"
                  onChange={handleAllergy}
                />
                Wheat
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Shellfish"
                  name="Shellfish"
                  id="Shellfish"
                  onChange={handleAllergy}
                />
                Shellfish
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Soybeans"
                  name="Soybeans"
                  id="Soybeans"
                  onChange={handleAllergy}
                />
                Soybeans
              </label>
            </div>
            <hr></hr>
            <div className="loginLabel">
              Any current injuries that would prevent you from a certain exercise?
              <label>
                <input
                  type="checkbox"
                  value="Arms"
                  name="Arms"
                  id="Arms"
                  onChange={handleInjury}
                />
                Arms
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Legs"
                  name="Legs"
                  id="Legs"
                  onChange={handleInjury}
                />
                Legs
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Shoulders"
                  name="Shoulders"
                  id="Shoulders"
                  onChange={handleInjury}
                />
                Shoulders
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Chest"
                  name="Chest"
                  id="Chest"
                  onChange={handleInjury}
                />
                Chest
              </label>
            </div>

            <input
              className="button"
              type="submit"
              onClick={handlePrevious}
              value="Previous"
            />
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default FirstTimeLogin;
