import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ==========================
   GET ALL PRODUCTS
========================== */
router.get("/", async (req, res) => {
  try {
    const { category, search, sortBy, limit } = req.query;

    let filter = {};

    // Category Filter
    if (category && category !== "all") {
      filter.category = {
        $regex: new RegExp("^" + category + "$", "i"),
      };
    }

    // Search Filter
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    let query = Product.find(filter);

    // Sorting
if (sortBy === "low") {
  query = query.sort({ price: 1 });
} else if (sortBy === "high") {
  query = query.sort({ price: -1 });
} else if (sortBy === "rating") {
  query = query.sort({ "rating.rate": -1 });
}

// Apply limit if provided
if (limit) {
  query = query.limit(Number(limit));
}

const products = await query;

res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* ==========================
   GET SINGLE PRODUCT
========================== */
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await Product.findOne({
      id: productId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* ==========================
   ADD PRODUCT
========================== */
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to Add Product",
    });
  }
});

/* ==========================
   UPDATE PRODUCT
========================== */
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        id: parseInt(req.params.id),
      },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to Update Product",
    });
  }
});

/* ==========================
   DELETE PRODUCT
========================== */
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      id: parseInt(req.params.id),
    });

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to Delete Product",
    });
  }
});

export default router;