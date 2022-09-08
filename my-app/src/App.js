import './App.css';
import {BrowserRouter as Router, renderMatches, Route, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {Profile} from './component/Profile'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(age);
    console.log(gender);
    console.log(weight);
    console.log(height);
  }

  return (
    <div>
      <form className="form-part" onSubmit={handleSubmit}>
<label>Enter your name:
  <input 
    type="text" 
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</label>
<label>Enter your age:
  <input 
    type="text" 
    value={age}
    onChange={(e) => setAge(e.target.value)}
  />
</label>
<label>Enter your gender:
  <input 
    type="text" 
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  />
</label>
<label>Enter your weight:
  <input 
    type="text" 
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
  />
</label>
<label>Enter your height:
  <input 
    type="text" 
    value={height}
    onChange={(e) => setHeight(e.target.value)}
  />
</label>
<input type="submit" name="Submit"  />
</form>
    </div>
    )
}

export default App;
