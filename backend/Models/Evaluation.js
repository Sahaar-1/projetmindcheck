import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema(
  {
    evaluationId: {
      type: Number,
      required: true,
    },
    responses: {
      type: Object,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

export default Evaluation;
