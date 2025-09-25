import { Router } from "express";
import { registerUser, loginUser, getUserProfile, generateToken } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import passport from "passport";


const router = Router();

// Auth Routes
router.post("/register", registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

// Google OAuth
router.get("/login/success", (req, res) => {
    if (req.user) {
        // use your existing generateToken function
        const token = generateToken(req.user._id);

        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
            token: token, // send token
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));


router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${process.env.CLIENT_URL}/login?error=account-exists`,
        failureMessage: true,
    }),
    // Successful login
    async (req, res) => {
        try {
            // Generate JWT for this user
            const token = generateToken(req.user._id);

            // Redirect frontend with token in query string

            res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);

        } catch (err) {
            res.redirect(`${process.env.CLIENT_URL}/login?error=server`);
        }
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

export default router;