import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
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
        overflow: "hidden"
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
          right: "-100px",
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

      {/* Login Card */}
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
              sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
            >
              Welcome Back
              <Typography
              variant="h5"
              align="center"
              sx={{ fontSize: "15px", color: "#a68d8dff", fontStyle: "italic", mb: 2}}
            >
              Use Credentials to acees your account
            </Typography>
            </Typography>

            <form onSubmit={submit} autoComplete="off">
               <input
                type="text"
                name="fakeusernameremembered"
                style={{ display: "none" }}
              />
              <input
                type="password"
                name="fakepasswordremembered"
                style={{ display: "none" }}
              />
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-email" 
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "#fff" },
                }}
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
                InputProps={{
                  style: { color: "#fff" },
                }}
              />

              <Button
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#e50914",
                    color: "#fff",
                  },
                }}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </Button>

              <Typography
                align="center"
                sx={{ mt: 2, color: "#ccc", fontSize: 14 }}
              >
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#e50914", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f493ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#e50914")}
                >
                  Register
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
