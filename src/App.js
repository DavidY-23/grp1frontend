import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your components here 
import CreateAccount from './components/CreateAccount';
import FirstTimeLogin from './components/FirstTimeLogin';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import ContactPage from './components/Contact';
import AboutPage from './components/About';


function App() {
  /* global google */
  return (
    <div>
    <Routes>
      {/* Add routes/your page components here  */}
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/About" element={<AboutPage/>}/>
      <Route exact path="/Contact" element={<ContactPage/>}/>
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/FirstTimeLogin" element={<FirstTimeLogin />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/LoginPage" element={<LoginPage/>}/>
    </Routes>
    </div>

  );
}

export default App;

