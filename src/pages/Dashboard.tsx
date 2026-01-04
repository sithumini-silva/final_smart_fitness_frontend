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
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';

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
                                    backgroundColor: "#e50914",
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
                                        color: "#700409ff" 
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
            {/* Meal Plans Section */}
<Container maxWidth="lg" sx={{ py: 10 }}>
    <Box sx={{ mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <RestaurantIcon sx={{ 
                color: "#e50914", 
                fontSize: 32, 
                mr: 2,
                backgroundColor: "rgba(229, 9, 20, 0.1)",
                p: 1,
                borderRadius: "50%"
            }} />
            <Box>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "#fff",
                        lineHeight: 1.2
                    }}
                >
                    Your Meal Plans
                </Typography>
                <Typography 
                    variant="caption" 
                    sx={{ 
                        color: "#e50914",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "1px",
                        display: "block",
                        mt: 0.5
                    }}
                >
                    NUTRITION TRACKER
                </Typography>
            </Box>
        </Box>
        
        <Typography 
            variant="body1" 
            sx={{ 
                color: "#b0b0b0",
                maxWidth: "600px",
                fontSize: "16px",
                lineHeight: 1.6,
                ml: 6
            }}
        >
            Track your nutrition journey with personalized AI-generated meal plans
        </Typography>
    </Box>

    <Grid container spacing={3}>
        {plans.map((plan) => (
            <Grid item xs={12} md={6} lg={4} key={plan._id}>
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.1)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderColor: "#e50914",
                            transform: "translateY(-8px)",
                            boxShadow: "0 15px 35px rgba(229, 9, 20, 0.25)"
                        }
                    }}
                >
                    {/* Top accent bar */}
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #e50914, #ff4d4d)"
                    }} />
                    
                    <CardContent sx={{ p: 3 }}>
                        {/* Date Header */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ 
                                    width: 40, 
                                    height: 40, 
                                    borderRadius: "50%", 
                                    backgroundColor: "rgba(229, 9, 20, 0.15)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mr: 2
                                }}>
                                    <CalendarTodayIcon sx={{ color: "#e50914", fontSize: 20 }} />
                                </Box>
                                <Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: "#e50914",
                                            fontSize: "16px",
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {new Date(plan.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: "#b0b0b0",
                                            fontSize: "11px"
                                        }}
                                    >
                                        {new Date(plan.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric'
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <IconButton
                                onClick={() => handleDelete(plan._id)}
                                size="small"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.5)",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    "&:hover": {
                                        backgroundColor: "rgba(229, 9, 20, 0.2)",
                                        color: "#ff6b6b"
                                    }
                                }}
                            >
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Meals Section */}
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <LocalDiningIcon sx={{ color: "#e50914", mr: 1, fontSize: 20 }} />
                                <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                        color: "#fff", 
                                        fontWeight: 600, 
                                        fontSize: "14px",
                                        letterSpacing: "0.5px"
                                    }}
                                >
                                    MEALS · {plan.meals.length}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ 
                                maxHeight: "180px",
                                overflowY: "auto",
                                pr: 1,
                                "&::-webkit-scrollbar": {
                                    width: "4px"
                                },
                                "&::-webkit-scrollbar-track": {
                                    background: "rgba(255, 255, 255, 0.05)"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: "rgba(229, 9, 20, 0.3)",
                                    borderRadius: "2px"
                                }
                            }}>
                                {plan.meals.map((m: string, i: number) => (
                                    <Box 
                                        key={i} 
                                        sx={{ 
                                            display: "flex", 
                                            alignItems: "flex-start",
                                            mb: 1.5,
                                            p: 1.5,
                                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                                            borderRadius: 1,
                                            border: "1px solid rgba(255, 255, 255, 0.05)",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor: "rgba(229, 9, 20, 0.1)",
                                                borderColor: "rgba(229, 9, 20, 0.2)",
                                                transform: "translateX(4px)"
                                            }
                                        }}
                                    >
                                        <Box sx={{ 
                                            width: 24, 
                                            height: 24, 
                                            borderRadius: "6px", 
                                            backgroundColor: "rgba(229, 9, 20, 0.2)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mr: 2,
                                            flexShrink: 0
                                        }}>
                                            <Typography sx={{ color: "#e50914", fontWeight: 800, fontSize: "12px" }}>
                                                {i + 1}
                                            </Typography>
                                        </Box>
                                        <Typography 
                                            sx={{ 
                                                color: "#e0e0e0",
                                                fontSize: "13px",
                                                lineHeight: 1.5,
                                                flex: 1
                                            }}
                                        >
                                            {m}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Footer */}
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between",
                            pt: 2,
                            borderTop: "1px solid rgba(255, 255, 255, 0.05)"
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <AccessTimeIcon sx={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 14, mr: 0.5 }} />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "rgba(255, 255, 255, 0.5)",
                                        fontSize: "11px"
                                    }}
                                >
                                    {new Date(plan.date).toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit',
                                        hour12: true 
                                    })}
                                </Typography>
                            </Box>
                            
                            <Button
                                size="small"
                                onClick={() => handleDelete(plan._id)}
                                startIcon={<DeleteOutlineIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                    color: "#ff6b6b",
                                    fontWeight: 700,
                                    fontSize: "11px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                                    borderRadius: "12px",
                                    px: 1.5,
                                    py: 0.25,
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 107, 107, 0.2)"
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
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
