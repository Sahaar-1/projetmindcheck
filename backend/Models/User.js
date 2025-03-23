import mongoose from "mongoose";

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
});

// Exporter le modèle User
const User = mongoose.model("User", userSchema);
export default User;
