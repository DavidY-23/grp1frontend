import './App.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {Profile} from './component/Profile'
import { Routes, Route } from "react-router-dom";
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
    <Routes>
      {/* Add routes/your page components here  */}
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  )
}

export default App;
