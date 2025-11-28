import Response from "../models/Response.js"
import Form from "../models/Form.js"

export const submitResponse = async (req, res) => {
  const { formId } = req.params
  const { answers } = req.body

  try {
    const form = await Form.findById(formId)
    if (!form || !form.published)
      return res.status(404).json({ message: "Form not found" })

    const response = await Response.create({
      formId,
      answers
    })

    res.json({ message: "Response saved", responseId: response._id })
  } catch {
    res.status(500).json({ message: "Submission failed" })
  }
}

export const getResponses = async (req, res) => {
  const { formId } = req.params

  try {
    const responses = await Response.find({ formId })
    res.json(responses)
  } catch {
    res.status(500).json({ message: "Fetch failed" })
  }
}
