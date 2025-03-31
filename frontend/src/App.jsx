import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";
import Results from "./pages/Results";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MentalFollowUp from "./pages/MentalFollowUp";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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
          <Route
            path="/evaluation"
            element={
              <PrivateRoute>
                <Evaluation />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            }
          />
          <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
          <Route
            path="/mental-follow-up"
            element={
              <PrivateRoute>
                <MentalFollowUp />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/evaluation" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
