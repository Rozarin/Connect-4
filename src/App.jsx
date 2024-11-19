// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landing-page/LandingPage";
import MainMenu from "./components/pages/main-menu/MainMenu";
import ConnectFour from "./components/pages/connect-four/ConnectFour";

function App() {
  return (
    <div className="font-Montserrat bg-secondary relative">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/connect-four/main-menu" element={<MainMenu />} />
          <Route path="/connect-four" element={<ConnectFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
