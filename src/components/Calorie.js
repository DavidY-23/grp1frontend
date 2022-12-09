import { darkScrollbar } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles/Calorie.css";

function Calorie() {

    const [calculate, setCalculate] = useState("");
    const [currWeight, setCurrWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");
    const [days, setDays] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hello!!!");
        console.log(currWeight, goalWeight, days);
        var calories = ((parseFloat(currWeight) - parseFloat(goalWeight)) * 3500)/parseFloat(days);
        setCalculate(`You would need to eat ${parseInt(calories)} less calories a day`) 
      };
    
    return (
        <div className="Calorie">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Current Weight</Form.Label>
          <Form.Control 
           required type="number"
           placeholder="Enter current weight" 
           onChange={(e) => setCurrWeight(e.target.value)}
           />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Goal Weight</Form.Label>
        <Form.Control 
        required type="number"
        placeholder="Enter goal" 
        onChange={(e) => setGoalWeight(e.target.value)}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Days</Form.Label>
          <Form.Control            
          required type="number"
          placeholder="How many days would you like to take" 
          onChange={(e) => setDays(e.target.value)}
        />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div id="calculate">{calculate}</div>
      </div>

      )
}

export default Calorie;