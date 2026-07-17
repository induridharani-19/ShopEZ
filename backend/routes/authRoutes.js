import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "shopez_secret_key_2026";

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: passwordHash
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Profile & Order History
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user's orders sorted by date descending
    const userOrders = await Order.find({ userId: user._id }).sort({ date: -1 });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.date
      },
      orders: userOrders
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Profile
router.put("/profile/update", authMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists && emailExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Email is already taken by another account" });
      }
      user.email = email.toLowerCase();
    }

    if (name) user.name = name;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Google Authentication Route
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Google ID Token is required" });
    }

    // Verify token using Google's public tokeninfo endpoint
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    if (!verifyRes.ok) {
      return res.status(400).json({ message: "Invalid Google ID Token" });
    }

    const payload = await verifyRes.json();
    if (payload.error_description) {
      return res.status(400).json({ message: payload.error_description });
    }

    const email = payload.email?.toLowerCase();
    const name = payload.name;

    if (!email) {
      return res.status(400).json({ message: "Google account does not expose an email address" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      console.log(`Registering new Google user: ${name} (${email})`);
      user = new User({
        name: name,
        email: email,
        googleId: payload.sub
      });
      await user.save();
    } else {
      console.log(`Logging in existing Google user: ${name} (${email})`);
      if (!user.googleId) {
        user.googleId = payload.sub;
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Google Auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ==========================
// GET ALL USERS (Admin)
// ==========================
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);

    res.status(500).json({
      message: "Unable to fetch users",
    });
  }
});
// Delete User
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to delete user",
    });
  }
});

export default router;
