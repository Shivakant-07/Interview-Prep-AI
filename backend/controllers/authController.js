import User from "../models/User.js";
import bcrypt from "bcryptjs";

import pkg from "jsonwebtoken";
const { sign, verify } = pkg;




// Generate JWT Token
export const generateToken = (userId) => {
    return sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            if (!userExists.password) {
                return res.status(400).json({
                    message: "This Email is already registered with Google. Please Sign in using Google."
                });
            }
            return res.status(400).json({
                message: "This Email is already registered. Please Login using email and password."
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// @desc Login user
// @route POST/api/auth/login
// @access Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: "No account found with this email. Please sign up to continue" });
        }

        // If user signed up with Google only
        if (!user.password) {
            return res.status(400).json({ message: "This account is registered with Google. Please login using Google." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({ message: "Invalid email or password" });
        }
        // Return user data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};


// export default { registerUser, loginUser, getUserProfile };
