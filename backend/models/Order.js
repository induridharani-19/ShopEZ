import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      id: Number,
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  subtotal: Number,
  delivery: Number,
  discount: Number,
  total: Number,
  status: {
    type: String,
    default: "Placed",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
