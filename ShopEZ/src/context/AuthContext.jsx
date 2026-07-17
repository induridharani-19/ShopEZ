import { createContext, useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await API.get("/auth/profile");
          setUser(res.data.user);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await API.post("/auth/register", { name, email, password });
      toast.success(res.data.message || "Registration successful! 🎉");
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed 😢";
      toast.error(msg);
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}! 👋`);
      return userData;
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed 😢";
      toast.error(msg);
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async (idToken) => {
    try {
      const res = await API.post("/auth/google", { idToken });
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      toast.success(`Logged in with Google! Welcome ${userData.name}! 👋`);
      return userData;
    } catch (error) {
      const msg = error.response?.data?.message || "Google Login failed 😢";
      toast.error(msg);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out successfully");
  };

  // Update Profile
  const updateProfile = async (name, email, password) => {
    try {
      const payload = { name, email };
      if (password) payload.password = password;

      const res = await API.put("/auth/profile/update", payload);
      setUser(res.data.user);
      toast.success("Profile updated successfully! ✨");
      return res.data.user;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update profile";
      toast.error(msg);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
