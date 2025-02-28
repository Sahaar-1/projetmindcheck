import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importer Axios
import './Register.css'; // Importer le CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !dob || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    // Vérifier la longueur du mot de passe
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Envoi des données d'enregistrement au backend
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        dob,
        password
      });

      alert(`Welcome ${username}, you are now registered!`);
      navigate("/login");
    } catch (error) {
      // Afficher l'erreur spécifique venant du backend
      const errorMessage = error.response?.data?.message || "Error during registration. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="title">Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button
            type="submit"
            className="submit-button"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
