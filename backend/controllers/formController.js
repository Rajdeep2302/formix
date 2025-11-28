import Form from "../models/Form.js";
import Response from "../models/Response.js";
import { ensureFormOwner } from "../utils/checkOwnership.js";

export const publishForm = async (req, res) => {
  const { title, description, fields } = req.body;

  if (!title || fields.length === 0)
    return res.status(400).json({ message: "Invalid form" });

  try {
    const form = await Form.create({
      userId: req.userId,
      title,
      description,
      fields,
      published: true,
    });

    res.json({ message: "Form published", formId: form._id });
  } catch (err) {
    res.status(500).json({ message: "Publish failed" });
  }
};

export const getUserForms = async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.userId });
    res.json(forms);
  } catch {
    res.status(500).json({ message: "Could not fetch forms" });
  }
};

export const getPublicForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);

    if (!form || !form.published)
      return res.status(404).json({ message: "Form not available" });

    res.json({
      id: form._id,
      title: form.title,
      description: form.description,
      fields: form.fields,
      createdAt: form.createdAt,
    });
  } catch {
    res.status(400).json({ message: "Invalid form id" });
  }
};

export const deleteForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const check = await ensureFormOwner(formId, req.userId);
    if (!check.ok)
      return res.status(check.code).json({ message: check.message });

    await Response.deleteMany({ formId });
    await check.form.deleteOne();

    res.json({ message: "Form and responses deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
