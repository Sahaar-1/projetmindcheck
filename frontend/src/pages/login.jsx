import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importation de useNavigate
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();  // Définition de navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      
      // Redirection vers la page d'accueil après un login réussi
      navigate("/home");  // Remplacez "/home" par l'URL de votre page d'accueil
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid username or password.";
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {!isLoggedIn ? (
          <>
            <h1 className="title">Login</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="form">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
            <p className="register-link">
              Pas encore inscrit ? <a href="/register">Créer un compte</a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
