import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";
import Results from "./pages/Results";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import Login from "./pages/login";
import Register from "./pages/Register";
import MentalFollowUp from "./pages/MentalFollowUp";

import "./App.css";



const App = () => {
  return (
      <Router>
            

        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/home"  element={<Home />} />
              <Route path="/evaluation"  element={<Evaluation />}  />
              <Route path="/results"  element={<Results />}  />
              <Route path="/journal"  element={<Journal />}  />
              <Route path="/resources" element={<Resources />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/suivi-mental"  element={<MentalFollowUp />}  />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </main>
        </div>
        

      </Router>
  );
};

export default App;
