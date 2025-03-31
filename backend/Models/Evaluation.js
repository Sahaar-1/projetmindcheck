import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responses: {
    type: Map,
    of: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Ajouter un index pour optimiser les recherches
evaluationSchema.index({ userId: 1, date: -1 });

// Méthode virtuelle pour obtenir le format JSON
evaluationSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return {
    id: obj._id,
    userId: obj.userId,
    score: obj.score,
    date: obj.date,
    responses: obj.responses,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt
  };
};

// Vérifier si le modèle existe déjà
const Evaluation = mongoose.models.Evaluation || mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;
