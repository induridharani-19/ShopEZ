import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
console.log("✅ orderRoutes.js loaded");

const router = express.Router();

// Place an order (Requires Authentication)
router.get("/test", (req, res) => {
  res.json({
    message: "Orders route is working",
  });
});
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      subtotal,
      delivery,
      discount,
      total
    } = req.body;

    if (!items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    let verifiedDetails = {};

    if (paymentMethod === "upi") {
      const { upiId } = paymentDetails || {};
      if (!upiId || !upiId.includes("@")) {
        return res.status(400).json({ message: "Invalid UPI ID. Must include '@' symbol (e.g., user@bank)." });
      }
      verifiedDetails = { upiId };
    } else if (paymentMethod === "card") {
      const { cardNumber, cardExpiry, cardCvv, cardName } = paymentDetails || {};
      const sanitizedCardNum = cardNumber ? cardNumber.replace(/\s/g, "") : "";
      
      if (!sanitizedCardNum || sanitizedCardNum.length !== 16 || isNaN(Number(sanitizedCardNum))) {
        return res.status(400).json({ message: "Invalid Card Number. Must be 16 digits." });
      }
      if (!cardExpiry || !cardExpiry.includes("/") || cardExpiry.length !== 5) {
        return res.status(400).json({ message: "Invalid Expiration Date. Format must be MM/YY." });
      }
      if (!cardCvv || cardCvv.length !== 3 || isNaN(Number(cardCvv))) {
        return res.status(400).json({ message: "Invalid CVV. Must be 3 digits." });
      }
      if (!cardName || cardName.trim() === "") {
        return res.status(400).json({ message: "Cardholder Name is required." });
      }

      // Mask details securely for storage (last 4 digits only)
      verifiedDetails = {
        cardHolder: cardName.trim(),
        lastFour: sanitizedCardNum.slice(-4),
        cardBrand: sanitizedCardNum.startsWith("4") ? "Visa" : sanitizedCardNum.startsWith("5") ? "Mastercard" : "Card"
      };
    } else if (paymentMethod === "cod") {
      verifiedDetails = {};
    } else {
      return res.status(400).json({ message: "Unsupported payment method" });
    }

    // Create a new mongoose order object
    const newOrder = new Order({
      id: "ORD-" + Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      paymentDetails: verifiedDetails,
      subtotal,
      delivery,
      discount,
      total
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's orders (Requires Authentication)
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ===============================
// Get All Orders (Admin)
// ===============================

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch all orders error:", error);
    res.status(500).json({
      message: "Unable to fetch orders",
    });
  }
});
// ===============================
// Update Order Status (Admin)
// ===============================
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to update order",
    });
  }
});

// ===============================
// Delete Order (Admin)
// ===============================
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete order error:", error);

    res.status(500).json({
      message: "Unable to delete order",
    });
  }
});

// GET DASHBOARD ANALYTICS (Admin)
router.get("/dashboard-stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const orders = await Order.find();
    const orderCount = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    res.json({
      productCount,
      userCount,
      orderCount,
      totalRevenue
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Unable to fetch dashboard statistics" });
  }
});


export default router;
