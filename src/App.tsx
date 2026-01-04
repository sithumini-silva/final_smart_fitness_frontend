// src/App.tsx
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AIGenerator from "./pages/AIGenerator";
import WorkoutGenerator from "./pages/WorkoutGenerator";
import WorkoutDashboard from "./pages/WorkoutDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";


const App: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //Routes without Navbar
  const hideNavbarRoutes = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* NAVBAR (conditionally hidden) */}
      {!shouldHideNavbar && (
        <AppBar position="static" color="primary">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Smart Fitness
            </Typography>

            {isAuthenticated && (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  Meal Plans
                </Button>

                <Button color="inherit" onClick={() => navigate("/ai-generate")}>
                  Generate Meal Plan
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate("/workout-dashboard")}
                >
                  Workout Plans
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate("/workout-generate")}
                >
                  Generate Workout
                </Button>

                <Typography variant="body2">
                  {user?.fullname} ({user?.role || "User"})
                </Typography>

                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-generate" element={<AIGenerator />} />
          <Route path="/workout-generate" element={<WorkoutGenerator />} />
          <Route path="/workout-dashboard" element={<WorkoutDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;
