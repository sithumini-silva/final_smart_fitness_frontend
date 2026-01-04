import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await axiosClient.post("/auth/register", {
                fullname,
                email,
                password,
                height: Number(height),
                weight: Number(weight),
            });
            toast.success("Registration successful! Please log in.");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url('/login-bg.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Dark Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.75)",
                }}
            />

            {/* Red Diagonal Shapes */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    right: "-150px",
                    width: "350px",
                    height: "100%",
                    backgroundColor: "#e50914",
                    transform: "skewX(-20deg)",
                    opacity: 0.5,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    left: "-100px",
                    width: "350px",
                    height: "100%",
                    backgroundColor: "#e50914",
                    transform: "skewX(-20deg)",
                    opacity: 0.5,
                }}
            />

            {/* Registration Card */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Card
                    sx={{
                        width: 480,
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(12px)",
                        borderRadius: 3,
                        boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: "#fff", fontWeight: "bold", mb: 1 }}
                        >
                            Create Account
                        </Typography>
                        <Typography
                            align="center"
                            sx={{ fontSize: "15px", color: "#a68d8dff", fontStyle: "italic", mb: 2 }}
                        >
                            Fill the form to access your account
                        </Typography>

                        <form autoComplete="off">
                            {/* Hidden dummy inputs to prevent browser autofill */}
                            <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
                            <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

                            <TextField
                                fullWidth
                                label="Full Name"
                                margin="normal"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                InputLabelProps={{ style: { color: "#ccc" } }}
                                InputProps={{ style: { color: "#fff" } }}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="new-email"
                                InputLabelProps={{ style: { color: "#ccc" } }}
                                InputProps={{ style: { color: "#fff" } }}
                            />

                            <TextField
                                fullWidth
                                label="Height (cm)"
                                margin="normal"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                InputLabelProps={{ style: { color: "#ccc" } }}
                                InputProps={{ style: { color: "#fff" } }}
                            />

                            <TextField
                                fullWidth
                                label="Weight (kg)"
                                margin="normal"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                InputLabelProps={{ style: { color: "#ccc" } }}
                                InputProps={{ style: { color: "#fff" } }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                InputLabelProps={{ style: { color: "#ccc" } }}
                                InputProps={{ style: { color: "#fff" } }}
                            />

                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                margin="normal"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                autoComplete="new-password"
                                InputLabelProps={{ style: { color: "#ccc" } }}
                                InputProps={{ style: { color: "#fff" } }}
                            />

                            <Button
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 1.2,
                                    fontWeight: "bold",
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    "&:hover": { backgroundColor: "#e50914", color: "#fff" },
                                }}
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "REGISTER"}
                            </Button>
                        </form>

                        <Typography align="center" sx={{ mt: 2, color: "#ccc", fontSize: 14 }}>
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "#e50914", textDecoration: "none" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f493ff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#e50914")}
                            >
                                Login
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Register;
