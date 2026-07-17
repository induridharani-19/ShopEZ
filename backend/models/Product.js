import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
