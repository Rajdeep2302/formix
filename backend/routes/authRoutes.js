import express from "express"
import { register, login } from "../controllers/authController.js"
import { requireFields } from "../middleware/validate.js"


const router = express.Router()

router.post("/register", requireFields(["name","email","password"]), register)
router.post("/login", requireFields(["email","password"]), login)

export default router
