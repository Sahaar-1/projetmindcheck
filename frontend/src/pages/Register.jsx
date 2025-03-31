import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validation des champs
    if (!username || !email || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires!");
      return;
    }

    if (username.length < 3) {
      setError("Le nom d'utilisateur doit contenir au moins 3 caractères!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide!");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas!");
      return;
    }

    const userData = {
      username,
      email,
      password,
      ...(dob && { dob })
    };

    console.log("Données envoyées:", userData);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", userData);
      console.log("Réponse du serveur:", response.data);

      // Stocke le token si l'inscription réussit
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/login");
    } catch (error) {
      console.error("Erreur d'inscription:", error.response?.data || error);
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === "Cet email est déjà utilisé") {
        setError(
          <div>
            Cet email est déjà utilisé. 
            <br />
            <Link to="/login" style={{ color: '#3498db', textDecoration: 'underline' }}>
              Connectez-vous ici
            </Link>
          </div>
        );
      } else {
        setError(errorMessage || "Erreur lors de l'inscription. Veuillez réessayer.");
      }
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
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleRegister} className="form">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
              minLength="3"
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              minLength="6"
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
              minLength="6"
            />
            <button type="submit" className="submit-button">
              S'inscrire
            </button>
          </form>
          <div className="divider"></div>
          <Link to="/login" className="login-link">
            Déjà un compte ? Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;