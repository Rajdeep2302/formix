import express from "express"
import { submitResponse, getResponses } from "../controllers/responseController.js"
import { protect } from "../middleware/authMiddleware.js"
import { requireFields } from "../middleware/validate.js"

const router = express.Router()

router.post("/:formId", requireFields(["answers"]), submitResponse)
router.get("/:formId", protect, getResponses)

export default router
