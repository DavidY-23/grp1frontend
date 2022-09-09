import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";

// Import your components here 
import CreateAccount from './components/CreateAccount';
import FirstTimeLogin from './components/FirstTimeLogin';
import Profile from './components/Profile';


function App() {
  return (
    <div>
    <Routes>
      {/* Add routes/your page components here  */}
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/FirstTimeLogin" element={<FirstTimeLogin />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
    </div>

  );
}

export default App;

