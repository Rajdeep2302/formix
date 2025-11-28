import Form from "../models/Form.js"

export const ensureFormOwner = async (formId, userId) => {
  const form = await Form.findById(formId)

  if (!form) return { ok: false, code: 404, message: "Form not found" }

  if (form.userId.toString() !== userId)
    return { ok: false, code: 403, message: "Not allowed" }

  return { ok: true, form }
}
