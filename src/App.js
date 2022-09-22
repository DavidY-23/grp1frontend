import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Import your components here 
import CreateAccount from './components/CreateAccount';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add routes/your page components here  */}
        <Route exact path='/' element={<CreateAccount />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/home/:state" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

