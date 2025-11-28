import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import responseRoutes from "./routes/responseRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import { apiLimiter } from "./middleware/rateLimit.js"

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }))
app.use(apiLimiter)
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Formix backend running");
});
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use(errorHandler)



connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
