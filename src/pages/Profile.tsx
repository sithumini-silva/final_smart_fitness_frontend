import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Optional: fetch full profile if more details exist
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (user) {
            setProfile(user); // simple version
        }
    }, [user]);

    if (!profile) {
        return (
            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Typography sx={{ color: "#fff" }}>Loading profile...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            <Card
                sx={{
                    width: 400,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                    p: 3,
                    color: "#fff",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", mb: 2, color: "#e50914", textAlign: "center" }}
                    >
                        Profile
                    </Typography>

                    <Typography sx={{ mb: 1.5 }}>
                        <strong>Full Name:</strong> {profile.fullname}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <strong>Email:</strong> {profile.email}
                    </Typography>
                    {profile.height && (
                        <Typography sx={{ mb: 1.5 }}>
                            <strong>Height:</strong> {profile.height} cm
                        </Typography>
                    )}
                    {profile.weight && (
                        <Typography sx={{ mb: 1.5 }}>
                            <strong>Weight:</strong> {profile.weight} kg
                        </Typography>
                    )}
                    {profile.role && (
                        <Typography sx={{ mb: 2 }}>
                            <strong>Role:</strong> {profile.role}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            background: "linear-gradient(90deg, #000000, #870000)",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: 2,
                            "&:hover": { background: "#ff4d4d" },
                        }}
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </Button>

                    <Button
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            backgroundColor: "transparent",
                            color: "#ff4d4d",
                            fontWeight: "bold",
                            border: "1px solid #ff4d4d",
                            borderRadius: 2,
                            "&:hover": { backgroundColor: "#ff4d4d", color: "#fff" },
                        }}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
