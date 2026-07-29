import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import Home from "../pages/home/Home";
import Features from "../pages/home/Features";
import Pricing from "../pages/price/Pricing";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../NotFound";

// Protected Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Meetings from "../pages/meetings/Meetings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/feature" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meetings"
        element={
          <ProtectedRoute>
            <Meetings />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
