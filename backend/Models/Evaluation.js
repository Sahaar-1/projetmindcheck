import mongoose from "mongoose";

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
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

evaluationSchema.pre("save", function (next) {
  this.evaluationId = this._id;
  next();
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;
