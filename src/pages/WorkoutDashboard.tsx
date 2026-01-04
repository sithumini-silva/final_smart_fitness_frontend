import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    CircularProgress,
    Box,
    Chip,
    Divider,
    IconButton,
    alpha
} from "@mui/material";
import { getWorkoutPlans, deleteWorkoutPlan } from "../api/workoutPlans";
import DeleteIcon from "@mui/icons-material/Delete";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimerIcon from "@mui/icons-material/Timer";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const WorkoutDashboard = () => {
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadWorkouts = async () => {
        try {
            const data = await getWorkoutPlans();
            setWorkouts(data);
        } catch (err) {
            console.error("Workout fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this workout plan?")) {
            await deleteWorkoutPlan(id);
            loadWorkouts();
        }
    };

    useEffect(() => {
        loadWorkouts();
    }, []);

    if (loading)
        return (
            <Box sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)"
            }}>
                <CircularProgress sx={{ color: "#e50914" }} size={60} />
            </Box>
        );

    return (
        <Box sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
            py: 8
        }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: "#e50914",
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "3px",
                            mb: 1,
                            display: "block"
                        }}
                    >
                        FITNESS TRACKER
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.5rem", md: "3rem" },
                                lineHeight: 1.2,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                background: "linear-gradient(90deg, #e50914, #ff4d4d)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                            }}
                        >
                            Your Workout Plans
                        </Typography>
                        
                        <Chip
                            icon={<WhatshotIcon />}
                            label={`${workouts.length} Plans`}
                            sx={{
                                backgroundColor: "rgba(229, 9, 20, 0.2)",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "14px",
                                px: 2,
                                py: 1
                            }}
                        />
                    </Box>
                    
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            color: "#b0b0b0",
                            fontSize: "18px",
                            lineHeight: 1.6,
                            maxWidth: "600px"
                        }}
                    >
                        Track your fitness journey with AI-generated workout plans. Review, manage, and stay motivated.
                    </Typography>
                </Box>

                {/* Workout Plans Grid */}
                {workouts.length === 0 ? (
                    <Box sx={{
                        textAlign: "center",
                        py: 10,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderRadius: 3,
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        <FitnessCenterIcon sx={{ fontSize: 80, color: "rgba(255, 255, 255, 0.1)", mb: 3 }} />
                        <Typography variant="h5" sx={{ color: "#fff", mb: 2, fontWeight: 600 }}>
                            No Workout Plans Yet
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#b0b0b0", maxWidth: "500px", margin: "0 auto" }}>
                            Start your fitness journey by generating your first AI-powered workout plan!
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {workouts.map((plan) => (
                            <Grid item xs={12} md={6} lg={4} key={plan._id}>
                                <Card
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(229, 9, 20, 0.2)",
                                        borderRadius: 3,
                                        height: "100%",
                                        transition: "all 0.3s ease",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&:hover": {
                                            borderColor: "#e50914",
                                            boxShadow: "0 10px 30px rgba(229, 9, 20, 0.2)",
                                            transform: "translateY(-4px)"
                                        }
                                    }}
                                >
                                    {/* Red accent line */}
                                    <Box sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        background: "linear-gradient(90deg, #e50914, #ff4d4d)"
                                    }} />
                                    
                                    <CardContent sx={{ p: 3, pt: 4 }}>
                                        {/* Header with date and delete button */}
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <CalendarTodayIcon sx={{ color: "#e50914", mr: 1, fontSize: 20 }} />
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: "#fff",
                                                        fontSize: "18px"
                                                    }}
                                                >
                                                    {new Date(plan.date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </Typography>
                                            </Box>
                                            
                                            <IconButton
                                                onClick={() => handleDelete(plan._id)}
                                                size="small"
                                                sx={{
                                                    color: "rgba(255, 255, 255, 0.5)",
                                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(229, 9, 20, 0.2)",
                                                        color: "#e50914"
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        {/* Fitness Goal */}
                                        {plan.fitnessGoal && (
                                            <Chip
                                                label={plan.fitnessGoal}
                                                size="small"
                                                sx={{
                                                    backgroundColor: "rgba(229, 9, 20, 0.15)",
                                                    color: "#fff",
                                                    fontWeight: 500,
                                                    mb: 2
                                                }}
                                            />
                                        )}

                                        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 2 }} />

                                        {/* Exercises Section */}
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                <FitnessCenterIcon sx={{ color: "#e50914", mr: 1, fontSize: 20 }} />
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: "#fff",
                                                        fontSize: "16px"
                                                    }}
                                                >
                                                    Exercises ({plan.exercises.length})
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{
                                                maxHeight: "200px",
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
                                                {plan.exercises.map((ex: string, idx: number) => (
                                                    <Box
                                                        key={idx}
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
                                                                borderColor: "rgba(229, 9, 20, 0.2)"
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            width: 24,
                                                            height: 24,
                                                            borderRadius: "50%",
                                                            backgroundColor: "rgba(229, 9, 20, 0.2)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            mr: 2,
                                                            flexShrink: 0,
                                                            mt: 0.5
                                                        }}>
                                                            <Typography sx={{ color: "#e50914", fontWeight: 700, fontSize: "12px" }}>
                                                                {idx + 1}
                                                            </Typography>
                                                        </Box>
                                                        <Typography
                                                            sx={{
                                                                color: "#e0e0e0",
                                                                fontSize: "14px",
                                                                lineHeight: 1.4
                                                            }}
                                                        >
                                                            {ex}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>

                                        {/* Footer with time info */}
                                        <Box sx={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "space-between",
                                            mt: 3,
                                            pt: 2,
                                            borderTop: "1px solid rgba(255, 255, 255, 0.05)"
                                        }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <TimerIcon sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, mr: 0.5 }} />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    {plan.exercises.length} exercises
                                                </Typography>
                                            </Box>
                                            
                                            <Button
                                                size="small"
                                                onClick={() => handleDelete(plan._id)}
                                                startIcon={<DeleteIcon />}
                                                sx={{
                                                    color: "#ff6b6b",
                                                    fontWeight: 600,
                                                    fontSize: "12px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(255, 107, 107, 0.1)"
                                                    }
                                                }}
                                            >
                                                Delete Plan
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Stats Summary */}
                {workouts.length > 0 && (
                    <Box sx={{
                        mt: 6,
                        p: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderRadius: 3,
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h3" sx={{ color: "#e50914", fontWeight: 800, mb: 1 }}>
                                        {workouts.length}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                                        Total Workout Plans
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h3" sx={{ color: "#e50914", fontWeight: 800, mb: 1 }}>
                                        {workouts.reduce((total, plan) => total + plan.exercises.length, 0)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                                        Total Exercises
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h3" sx={{ color: "#e50914", fontWeight: 800, mb: 1 }}>
                                        {new Date(Math.max(...workouts.map(p => new Date(p.date).getTime()))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                                        Latest Plan
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default WorkoutDashboard