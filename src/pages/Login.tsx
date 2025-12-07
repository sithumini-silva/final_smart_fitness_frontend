import React, { useState } from "react";
import { Container, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center">
                        Login
                    </Typography>

                    <form onSubmit={submit}>
                        <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <Typography align="center" sx={{ mt: 2 }}>
                            Don’t have an account? <Link to="/register">Register</Link>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
