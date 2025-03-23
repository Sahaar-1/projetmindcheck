import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";
import Results from "./pages/Results";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import Login from "./pages/login";
import Register from "./pages/Register";
import MentalFollowUp from "./pages/MentalFollowUp";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/evaluation" element={<PrivateRoute><Evaluation /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
          <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
          <Route path="/suivi-mental" element={<PrivateRoute><MentalFollowUp /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
