import mongoose from "mongoose"

const answerSchema = new mongoose.Schema({
  question: String,
  value: String
})

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  answers: [answerSchema],
  submittedAt: { type: Date, default: Date.now }
})

export default mongoose.model("Response", responseSchema)
