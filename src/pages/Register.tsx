import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            await axiosClient.post("/auth/register", {
                fullname,
                email,
                password,
                height: Number(height),
                weight: Number(weight)
            });

            toast.success("Registration successful! Please log in.");
            navigate("/login");

        } catch (err: any) {
            toast.error(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <Container sx={{ mt: 4, maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>Register</Typography>

            <TextField fullWidth label="Full Name" sx={{ mb: 2 }} value={fullname}
                       onChange={(e) => setFullname(e.target.value)} />

            <TextField fullWidth label="Email" sx={{ mb: 2 }} value={email}
                       onChange={(e) => setEmail(e.target.value)} />

            <TextField fullWidth label="Height (cm)" sx={{ mb: 2 }} value={height}
                       onChange={(e) => setHeight(e.target.value)} />

            <TextField fullWidth label="Weight (kg)" sx={{ mb: 2 }} value={weight}
                       onChange={(e) => setWeight(e.target.value)} />

            <TextField fullWidth type="password" label="Password" sx={{ mb: 2 }} value={password}
                       onChange={(e) => setPassword(e.target.value)} />

            <TextField fullWidth type="password" label="Confirm Password" sx={{ mb: 2 }} value={confirm}
                       onChange={(e) => setConfirm(e.target.value)} />

            <Button fullWidth variant="contained" onClick={handleRegister}>
                Register
            </Button>
        </Container>
    );
};

export default Register;
