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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !dob || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires!");
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

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        dob,
        password
      });

      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription. Veuillez réessayer.";
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
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleRegister} className="form">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
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
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="submit-button">
              S'inscrire
            </button>
          </form>
          <div className="divider"></div>
          <Link to="/login" className="create-account-button">
            Déjà inscrit ? Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
