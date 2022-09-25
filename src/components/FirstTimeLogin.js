import "./styles/FirstTimeLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FirstTimeLogin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [page, setPage] = useState(0);
  const [allergies, setAllergies] = useState([]);
  const [injury, setInjury] = useState([]);

  const handlePrevious = () => {
    setPage(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (page === 0) {
      setPage(1);
      return;
    }
    if (page === 1)
      navigate("/home/profile", {
        state: {
          name: name,
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

  if (page === 0) {
    return (
      <div id="back">
        <div className="form-part">
          <h3>Please tell us about yourself</h3>
          <form onSubmit={handleSubmit}>
            <label className="loginLabel">
              Enter your name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your gender:
              <input
                type="radio"
                value="Male"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                value="Female"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
              <input
                type="radio"
                value="Other"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </label>
            <label className="loginLabel">
              Enter your weight (lbs):
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <label className="loginLabel">
              Enter your height (in):
              <input
                type="number"
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
          <h3>Please tell us about yourself</h3>
          <form onSubmit={handleSubmit}>
            <label className="loginLabel">
              Any food allergies?:
              <input type="checkbox" value="Milk" onChange={handleAllergy} />
              Milk
              <input type="checkbox" value="Nuts" onChange={handleAllergy} />
              Nuts
              <input type="checkbox" value="Eggs" onChange={handleAllergy} />
              Eggs
              <input type="checkbox" value="Fish" onChange={handleAllergy} />
              Fish
              <input type="checkbox" value="Wheat" onChange={handleAllergy} />
              Wheat
              <input
                type="checkbox"
                value="Shellfish"
                onChange={handleAllergy}
              />
              Shellfish
              <input
                type="checkbox"
                value="Soybeans"
                onChange={handleAllergy}
              />
              Soybeans
            </label>
            <label className="loginLabel">
              Any current injuries that would prevent you from exercises?:
              <input type="checkbox" value="Arms" onChange={handleInjury} />
              Arms
              <input type="checkbox" value="Legs" onChange={handleInjury} />
              Legs
              <input
                type="checkbox"
                value="Shoulders"
                onChange={handleInjury}
              />
              Shoulders
              <input type="checkbox" value="Chest" onChange={handleInjury} />
              Chest
            </label>
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
