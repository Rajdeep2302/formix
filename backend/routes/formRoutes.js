import express from "express"
import { publishForm, getUserForms, getPublicForm, deleteForm } from "../controllers/formController.js"
import { protect } from "../middleware/authMiddleware.js"
import { requireFields } from "../middleware/validate.js"


const router = express.Router()

router.post("/publish", protect, requireFields(["title", "fields"]), publishForm)
router.get("/my", protect, getUserForms)
router.get("/public/:formId", getPublicForm)
router.delete("/:formId", protect, deleteForm)



export default router
