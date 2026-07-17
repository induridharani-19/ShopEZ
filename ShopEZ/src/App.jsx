import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AIChatbot from "./components/AIChatbot";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>

      <Footer />
      <AIChatbot />
    </>
  );
}

export default App;