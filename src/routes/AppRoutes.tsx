import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/profile/password" element={<ChangePassword />} />
    </Route>

    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;
