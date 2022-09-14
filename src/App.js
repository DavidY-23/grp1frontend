import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';

// Import your components here 
import CreateAccount from './components/CreateAccount';
import FirstTimeLogin from './components/FirstTimeLogin';
import Profile from './components/Profile';
import ExerciseSearch from './components/ExerciseSearch';

function App() {
  /* global google */
  return (
    <div>
    <Routes>
      {/* Add routes/your page components here  */}
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/FirstTimeLogin" element={<FirstTimeLogin />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/LoginPage" element={<LoginPage/>}/>
      <Route path="/ExerciseSearch" element={<ExerciseSearch/>}/>
    </Routes>
    </div>

  );
}

export default App;

