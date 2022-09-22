import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CreateAccount from '../components/CreateAccount'

const routes = (
    <div>
        <BrowserRouter>
            <Routes>
                {/* Add routes/your page components here  */}
                <Route exact path="/"  element={<div>hi</div>}/>
                <Route path="/CreateAccount" element={<CreateAccount />} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default routes;