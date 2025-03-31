import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    emotion: {
      type: String,
      required: true,
      enum: ['joyeux', 'triste', 'en colère', 'anxieux', 'calme', 'frustré', 'fier', 'confus']
    },
    intensity: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    description: {
      type: String,
      required: true
    },
    activities: [{
      type: String,
      enum: ['sport', 'lecture', 'méditation', 'musique', 'art', 'autre']
    }],
    tags: [{
      type: String
    }]
  },
  { timestamps: true }
);

// Index pour optimiser les recherches par utilisateur et date
journalSchema.index({ userId: 1, date: -1 });

const Journal = mongoose.model("Journal", journalSchema);

export default Journal; 