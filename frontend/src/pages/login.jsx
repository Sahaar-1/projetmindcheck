import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("/home");  
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password.";
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <img src="/logoo.png" alt="MindCheck" />
          <h2>Avec MindCheck, prenez soin de votre santé mentale et restez en contact avec votre bien-être.</h2>
        </div>
        <div className="auth-box">
          {!isLoggedIn && (
            <>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleLogin} className="form">
                <input
                  type="text"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <button type="submit" className="submit-button">
                  Se connecter
                </button>
              </form>
              <div className="divider"></div>
              <Link to="/register" className="create-account-button">
                Créer un nouveau compte
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
