import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import { generateInterviewQuestions, generateConceptExplanation } from "./controllers/aiController.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";

// Set up __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


// -------------------- Session --------------------
app.use(session({
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: false,
    cookie: {
        name: "session",
        keys: ["cyberwolve"],
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// -------------------- Passport --------------------
app.use(passport.initialize());
app.use(passport.session());

// -------------------- CORS --------------------
app.use(cors({
    origin: process.env.CLIENT_URL || "https://interview-prep-ai-frontend-a02d.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// -------------------- Connect DB --------------------
connectDB();

// -------------------- Middleware --------------------
app.use(express.json());

// -------------------- Routes --------------------
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("✅ Interview Prep AI Backend is running!");
});


// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
