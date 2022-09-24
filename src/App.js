import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

// Import your components here
import CreateAccount from "./components/CreateAccount";
import FirstTimeLogin from "./components/FirstTimeLogin";
import WelcomePage from "./components/WelcomePage";
import ContactPage from "./components/Contact";
import AboutPage from "./components/About";
import HomePage from "./components/HomePage";
import Overview from './components/Overview';

function App() {
  /* global google */
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Add routes/your page components here  */}
          <Route path="/home/:state" element={<HomePage />} />
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/About" element={<AboutPage />} />
          <Route exact path="/Contact" element={<ContactPage />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/FirstTimeLogin" element={<FirstTimeLogin />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Overview" element={<Overview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
