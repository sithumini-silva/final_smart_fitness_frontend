import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const hideNavbarRoutes = ["/login", "/register"]; 

    if (hideNavbarRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "#0066b2" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                {/* BRAND */}
                <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                >
                    Smart Fitness
                </Typography>

                {/* Navigation Buttons */}
                {user && (
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button color="inherit" onClick={() => navigate("/dashboard")}>
                            Meal Plans
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/generate")}>
                            Generate Meal Plan
                        </Button>

                        {/* NEW: Workout Navigation */}
                        <Button color="inherit" onClick={() => navigate("/workout-dashboard")}>
                            Workouts
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/workout-generate")}>
                            Generate Workout
                        </Button>
                    </Box>
                )}

                {/* User Info / Logout */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {user && (
                        <Typography variant="body1">
                            {user.fullname} ({user.role || "User"})
                        </Typography>
                    )}

                    {user ? (
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
