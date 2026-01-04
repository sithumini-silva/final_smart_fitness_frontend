import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    CircularProgress,
    Box,
    Card,
    CardContent
} from "@mui/material";
import { getMealPlans, deleteMealPlan } from "../api/mealPlans";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const data = await getMealPlans();
            setPlans(data);
        } catch (err) {
            console.error("MealPlan Fetch Error:", err);
            setPlans([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteMealPlan(id);
        fetchPlans();
    };

    if (loading)
        return (
            <Container sx={{ mt: 4, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );

      return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff" }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: "relative",
                    minHeight: "700px",
                    display: "flex",
                    alignItems: "center",
                    backgroundImage: "url('/hero-fitness.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                }}
            >
                {/* Dark overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: 1,
                    }}
                />

                {/* Red accent gradient */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(229, 9, 20, 0.3) 0%, transparent 50%)",
                        zIndex: 2,
                    }}
                />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
                    <Grid container>
                        {/* Text Side */}
                        <Grid item xs={12} md={8}>
                            <Typography 
                                variant="overline" 
                                sx={{ 
                                    color: "#e50914", 
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    letterSpacing: "2px",
                                    mb: 2,
                                    display: "block"
                                }}
                            >
                                SMART FITNESS CLUB
                            </Typography>
                            <Typography 
                                variant="h2" 
                                sx={{ 
                                    fontWeight: 900, 
                                    mb: 3,
                                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                                    lineHeight: 1.2,
                                    textTransform: "uppercase",
                                    letterSpacing: "2px"
                                }}
                            >
                                TRAIN THE<br />
                                <span style={{ color: "#fff" }}>FIGHTER</span> IN YOU
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 4, 
                                    color: "#e0e0e0",
                                    maxWidth: "600px",
                                    fontSize: "16px",
                                    lineHeight: 1.6
                                }}
                            >
                                Start your fitness journey today. Track your meals and create plans tailored to your goals. Build strength, endurance, and discipline.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#870000;",
                                    color: "#fff",
                                    fontWeight: 700,
                                    px: 5,
                                    py: 1.75,
                                    fontSize: "15px",
                                    borderRadius: "50px",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    "&:hover": { 
                                        backgroundColor: "#fff", 
                                        color: "#c7060fff" 
                                    },
                                }}
                                onClick={() => navigate("/ai-generate")}
                            >
                                Generate New Meal Plan
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Meal Plans Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mb: 5, 
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}
                >
                    Your Meal Plans
                </Typography>

                <Grid container spacing={3}>
                    {plans.map((plan) => (
                        <Grid item xs={12} md={6} lg={4} key={plan._id}>
                            <Card
                                elevation={6}
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    color: "#fff",
                                    borderRadius: 3,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.08)",
                                        borderColor: "#e50914",
                                    }
                                }}
                            >
                                <CardContent>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            mb: 1.5,
                                            fontWeight: 700,
                                            color: "#e50914"
                                        }}
                                    >
                                        {new Date(plan.date).toLocaleDateString()}
                                    </Typography>

                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        <strong>Meals:</strong>
                                        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                                            {plan.meals.map((m: string, i: number) => (
                                                <li key={i} style={{ marginBottom: "4px" }}>{m}</li>
                                            ))}
                                        </ul>
                                    </Typography>

                                    <Button
                                        color="error"
                                        size="small"
                                        sx={{ 
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            fontSize: "12px"
                                        }}
                                        onClick={() => handleDelete(plan._id)}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;
