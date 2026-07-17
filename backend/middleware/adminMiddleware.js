import User from "../models/User.js";

export default async function adminMiddleware(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Access denied. User identity not found." });
    }

    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin authorization required." });
    }

    next();
  } catch (error) {
    console.error("Admin verification error:", error);
    return res.status(500).json({ message: "Server error verifying admin privileges." });
  }
}
