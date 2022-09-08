import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";

// Import your components here 
import CreateAccount from './components/CreateAccount';


function App() {
  return (
    <Routes>
      {/* Add routes/your page components here  */}
      <Route path="/CreateAccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;

