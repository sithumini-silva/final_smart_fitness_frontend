import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <CssBaseline />

            {/* Header */}
            <Navbar />

            {/* Page Content */}
            <Container
                component="main"
                maxWidth="lg"
                sx={{ flexGrow: 1, py: 4, minHeight: "80vh" }}
            >
                <Outlet />
            </Container>

            {/* Footer (optional later) */}
            {/* <Box sx={{ py: 2, textAlign: "center", bgcolor: "#f1f1f1" }}>©2025 Smart Fitness</Box> */}
        </Box>
    );
};

export default Layout;
