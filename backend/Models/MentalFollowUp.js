import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  }
});

const mentalFollowUpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluation',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  tasks: [taskSchema],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Méthode pour calculer la progression
mentalFollowUpSchema.methods.calculateProgress = function() {
  if (!this.tasks || this.tasks.length === 0) return 0;
  const completedTasks = this.tasks.filter(task => task.completed).length;
  return Math.round((completedTasks / this.tasks.length) * 100);
};

// Middleware pour mettre à jour la progression avant de sauvegarder
mentalFollowUpSchema.pre('save', function(next) {
  this.progress = this.calculateProgress();
  next();
});

// Vérifier si le modèle existe déjà
const MentalFollowUp = mongoose.models.MentalFollowUp || mongoose.model("MentalFollowUp", mentalFollowUpSchema);

export default MentalFollowUp; 