import Form from "../models/Form.js"
import Response from "../models/Response.js"

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.userId

    const forms = await Form.find({ userId })
    const formIds = forms.map(f => f._id)

    const totalForms = forms.length
    const liveForms = forms.filter(f => f.published).length
    const totalResponses = await Response.countDocuments({ formId: { $in: formIds } })

    res.json({
      totalForms,
      liveForms,
      totalResponses
    })
  } catch (err) {
    res.status(500).json({ message: "Dashboard aggregation failed" })
  }
}
