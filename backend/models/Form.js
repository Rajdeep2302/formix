import mongoose from "mongoose"

const fieldSchema = new mongoose.Schema({
  type: String,
  question: String,
  options: [String],
  limit: String,
  from: String,
  to: String
})

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  fields: [fieldSchema],
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Form", formSchema)
