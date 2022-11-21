import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

// Import your components here
import CreateAccount from "./components/CreateAccount";
import FirstTimeLogin from "./components/FirstTimeLogin";
import WelcomePage from "./components/WelcomePage";
import ContactPage from "./components/Contact";
import AboutPage from "./components/About";
import HomePage from "./components/HomePage";
import Overview from "./components/Overview";
import Profile from "./components/Profile";
import RecipeSearch from "./components/RecipeSearch";
import ExerciseSearch from "./components/ExerciseSearch";
import ExerciseContent from "./components/ExerciseContent";

function App() {
  /* global google */
  const [loggedIn, setLogin] = useState(true);

  if (loggedIn) {
    return (
      <div>
        <Routes>
          {/* Add routes/your page components here  */}
          <Route path="/home">
            <Route index element={<Navigate to="/home/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="recipe" element={<RecipeSearch />} />
            <Route path="exercise" element={<ExerciseSearch />}>
              <Route path=":exerciseContent" element={<ExerciseContent />} />
            </Route>
          </Route>
          <Route path="/home/exercise/arms" element={<ExerciseContent />} />
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/About" element={<AboutPage />} />
          <Route exact path="/Contact" element={<ContactPage />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/FirstTimeLogin" element={<FirstTimeLogin />} />
          <Route path="/LoginPage" element={<LoginPage />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<div>not logged in bucko</div>} />
          <Route path="*" element={<div>L + ratio</div>} />
        </Routes>
      </div>
    );
  }
}

export default App;
