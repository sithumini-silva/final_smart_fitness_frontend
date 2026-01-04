import React, { useState } from "react";
import {
    Container,
    Button,
    Typography,
    CircularProgress,
    List,
    ListItem,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { generateWorkoutPlan, saveWorkoutPlan } from "../api/workoutPlans";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BoltIcon from "@mui/icons-material/Bolt";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";

const WorkoutGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState<any>(null);

    const navigate = useNavigate();

    const handleGenerate = async () => {
        setLoading(true);
        const result = await generateWorkoutPlan();
        setGenerated(result);
        setLoading(false);
    };

    const handleSave = async () => {
        await saveWorkoutPlan({
            exercises: generated.exercises,
            fitnessGoal: generated.fitnessGoal
        });
        navigate("/dashboard");
    };

    return (
        <Box sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
            py: 8
        }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{
                    textAlign: "center",
                    mb: 6,
                    position: "relative"
                }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: "#e50914",
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "3px",
                            mb: 2,
                            display: "block"
                        }}
                    >
                        AI-POWERED FITNESS
                    </Typography>
                    
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 3,
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            lineHeight: 1.2,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            background: "linear-gradient(90deg, #e50914, #ff4d4d)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                        }}
                    >
                        Smart Workout Generator
                    </Typography>
                    
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: "#b0b0b0",
                            maxWidth: "700px",
                            margin: "0 auto",
                            fontSize: "18px",
                            lineHeight: 1.6
                        }}
                    >
                        Get a personalized workout plan created by AI based on your fitness level and goals.
                        Perfect for building strength, endurance, and achieving your fitness targets.
                    </Typography>
                </Box>

                {/* Generate Button Section */}
                <Box sx={{
                    textAlign: "center",
                    mb: 6,
                    position: "relative"
                }}>
                    <Button
                        variant="contained"
                        onClick={handleGenerate}
                        disabled={loading}
                        startIcon={loading ? null : <BoltIcon />}
                        sx={{
                            background: "linear-gradient(90deg, #e50914, #ff4d4d)",
                            color: "#fff",
                            fontWeight: 800,
                            px: 8,
                            py: 2.5,
                            fontSize: "18px",
                            borderRadius: "50px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            minWidth: "350px",
                            position: "relative",
                            overflow: "hidden",
                            "&:hover": {
                                background: "linear-gradient(90deg, #ff4d4d, #e50914)",
                                boxShadow: "0 10px 30px rgba(229, 9, 20, 0.4)",
                                transform: "translateY(-2px)"
                            },
                            "&:disabled": {
                                background: "rgba(255, 255, 255, 0.1)",
                                color: "rgba(255, 255, 255, 0.3)",
                                transform: "none"
                            },
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                                transition: "0.5s"
                            },
                            "&:hover::before": {
                                left: "100%"
                            }
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                            "Generate Workout Plan"
                        )}
                    </Button>
                    
                    <Typography
                        variant="caption"
                        sx={{
                            display: "block",
                            mt: 2,
                            color: "#888",
                            fontSize: "14px"
                        }}
                    >
                        {loading ? "AI is creating your personalized workout plan..." : "Click to generate your AI-powered workout plan"}
                    </Typography>
                </Box>

                {/* Generated Workout Plan */}
                {generated && (
                    <Box sx={{
                        animation: "fadeIn 0.5s ease-in"
                    }}>
                        {/* Fitness Goal Card */}
                        <Card sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(229, 9, 20, 0.3)",
                            borderRadius: 3,
                            mb: 4,
                            boxShadow: "0 8px 32px rgba(229, 9, 20, 0.1)"
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                    <FitnessCenterIcon sx={{ color: "#e50914", mr: 2, fontSize: 32 }} />
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#fff"
                                        }}
                                    >
                                        Fitness Goal
                                    </Typography>
                                </Box>
                                
                                <Chip
                                    label={generated.fitnessGoal}
                                    sx={{
                                        backgroundColor: "rgba(229, 9, 20, 0.2)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        px: 2,
                                        py: 1,
                                        borderRadius: "20px"
                                    }}
                                />
                                
                                <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                                    <ScheduleIcon sx={{ color: "#e50914", mr: 1, fontSize: 20 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#b0b0b0"
                                        }}
                                    >
                                        Generated on {new Date().toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Exercises List */}
                        <Card sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(229, 9, 20, 0.2)",
                            borderRadius: 3,
                            mb: 4
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#fff",
                                        mb: 3
                                    }}
                                >
                                    Recommended Exercises ({generated.exercises.length})
                                </Typography>
                                
                                <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />
                                
                                <Grid container spacing={2}>
                                    {generated.exercises.map((ex: string, idx: number) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                                    borderRadius: 2,
                                                    p: 2.5,
                                                    height: "100%",
                                                    transition: "all 0.2s ease",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(229, 9, 20, 0.1)",
                                                        borderColor: "rgba(229, 9, 20, 0.3)",
                                                        transform: "translateY(-2px)"
                                                    }
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                                    <Box sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: "50%",
                                                        backgroundColor: "rgba(229, 9, 20, 0.2)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        mr: 2,
                                                        flexShrink: 0
                                                    }}>
                                                        <Typography sx={{ color: "#e50914", fontWeight: 700 }}>
                                                            {idx + 1}
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        sx={{
                                                            color: "#fff",
                                                            fontWeight: 500,
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {ex}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Save Button */}
                        <Box sx={{ textAlign: "center", mt: 6 }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSave}
                                startIcon={<SaveIcon />}
                                sx={{
                                    background: "linear-gradient(90deg, #00c853, #64dd17)",
                                    color: "#fff",
                                    fontWeight: 800,
                                    px: 8,
                                    py: 2,
                                    fontSize: "18px",
                                    borderRadius: "50px",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    minWidth: "300px",
                                    "&:hover": {
                                        background: "linear-gradient(90deg, #64dd17, #00c853)",
                                        boxShadow: "0 10px 30px rgba(0, 200, 83, 0.4)",
                                        transform: "translateY(-2px)"
                                    }
                                }}
                            >
                                Save Workout Plan
                            </Button>
                            
                            <Typography
                                variant="caption"
                                sx={{
                                    display: "block",
                                    mt: 2,
                                    color: "#888",
                                    fontSize: "14px"
                                }}
                            >
                                Save this workout plan to your dashboard for future reference
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Features Section */}
                {!generated && !loading && (
                    <Grid container spacing={3} sx={{ mt: 8 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                textAlign: "center",
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(229, 9, 20, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 20px"
                                }}>
                                    <Typography variant="h4">🏋️</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
                                    Personalized Plans
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                                    Workouts tailored to your fitness level and goals
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                textAlign: "center",
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(229, 9, 20, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 20px"
                                }}>
                                    <Typography variant="h4">⚡</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
                                    Instant Generation
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                                    Get your customized workout plan in seconds
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                textAlign: "center",
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(229, 9, 20, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 20px"
                                }}>
                                    <Typography variant="h4">📊</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
                                    Science-Based
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                                    Exercises based on fitness research and best practices
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                )}

                {/* Add CSS for animation */}
                <style>
                    {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    `}
                </style>
            </Container>
        </Box>
    );
};

export default WorkoutGenerator