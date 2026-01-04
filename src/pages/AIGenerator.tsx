import React, { useState } from "react";
import {
    Container,
    Button,
    CircularProgress,
    Typography,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Box,
    Grid,
    Card,
    CardContent
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { createMealPlan } from "../api/mealPlans";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const dietOptions = [
    { value: "Vegan", icon: "🌱" },
    { value: "Vegetarian", icon: "🥗" },
    { value: "Keto", icon: "🥩" },
    { value: "Low-Carb", icon: "🥑" }
];
const fitnessGoals = [
    { value: "Weight Loss", icon: "⚖️" },
    { value: "Weight Gain", icon: "💪" },
    { value: "Maintain Weight", icon: "⚖️" }
];

const AIGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [dietPreferences, setDietPreferences] = useState<string[]>([]);
    const [fitnessGoal, setFitnessGoal] = useState("");

    const navigate = useNavigate();

    const toggleDiet = (diet: string) => {
        setDietPreferences((prev) =>
            prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
        );
    };

    const handleGenerate = async () => {
        setLoading(true);

        try {
            const aiRes = await axiosClient.post("/ai/generate", {
                dietPreferences,
                fitnessGoal
            });

            const plan = aiRes.data?.data;
            if (!plan?.generatedMeals) throw new Error("Invalid AI output");

            await createMealPlan({
                date: new Date().toISOString(),
                meals: plan.generatedMeals
            });

            navigate("/dashboard");
        } catch (e: any) {
            alert("AI generation failed: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ 
            minHeight: "100vh", 
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            color: "#fff",
            py: 8
        }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ 
                    textAlign: "center", 
                    mb: 8,
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
                        AI-POWERED NUTRITION
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
                        AI Meal Plan Generator
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
                        Let our AI create a personalized meal plan based on your dietary preferences and fitness goals. 
                        Get scientifically-backed nutrition recommendations in seconds.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Left Side - Diet Preferences */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(229, 9, 20, 0.2)",
                            borderRadius: 3,
                            height: "100%",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                borderColor: "#e50914",
                                boxShadow: "0 10px 30px rgba(229, 9, 20, 0.2)"
                            }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                    <RestaurantIcon sx={{ color: "#e50914", mr: 2, fontSize: 32 }} />
                                    <Typography 
                                        variant="h5" 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: "#fff"
                                        }}
                                    >
                                        Diet Preferences
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 4 }}>
                                    Select all that apply to your dietary lifestyle
                                </Typography>
                                
                                <FormControl component="fieldset" fullWidth>
                                    <FormGroup>
                                        {dietOptions.map((d) => (
                                            <Card
                                                key={d.value}
                                                onClick={() => toggleDiet(d.value)}
                                                sx={{
                                                    mb: 2,
                                                    cursor: "pointer",
                                                    backgroundColor: dietPreferences.includes(d.value) 
                                                        ? "rgba(229, 9, 20, 0.15)" 
                                                        : "rgba(255, 255, 255, 0.05)",
                                                    border: `1px solid ${dietPreferences.includes(d.value) 
                                                        ? "#e50914" 
                                                        : "rgba(255, 255, 255, 0.1)"}`,
                                                    borderRadius: 2,
                                                    transition: "all 0.2s ease",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(229, 9, 20, 0.1)",
                                                        borderColor: "#e50914"
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 2 }}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={dietPreferences.includes(d.value)}
                                                                onChange={() => toggleDiet(d.value)}
                                                                sx={{
                                                                    color: "transparent",
                                                                    "&.Mui-checked": {
                                                                        color: "transparent"
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                <Typography variant="h5" sx={{ mr: 2 }}>
                                                                    {d.icon}
                                                                </Typography>
                                                                <Typography 
                                                                    sx={{ 
                                                                        fontWeight: 600,
                                                                        color: dietPreferences.includes(d.value) 
                                                                            ? "#fff" 
                                                                            : "#b0b0b0",
                                                                        fontSize: "16px"
                                                                    }}
                                                                >
                                                                    {d.value}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Side - Fitness Goals */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(229, 9, 20, 0.2)",
                            borderRadius: 3,
                            height: "100%",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                borderColor: "#e50914",
                                boxShadow: "0 10px 30px rgba(229, 9, 20, 0.2)"
                            }
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
                                
                                <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 4 }}>
                                    Select your primary fitness objective
                                </Typography>
                                
                                <RadioGroup
                                    value={fitnessGoal}
                                    onChange={(e) => setFitnessGoal(e.target.value)}
                                    sx={{ width: "100%" }}
                                >
                                    {fitnessGoals.map((goal) => (
                                        <Card
                                            key={goal.value}
                                            onClick={() => setFitnessGoal(goal.value)}
                                            sx={{
                                                mb: 2,
                                                cursor: "pointer",
                                                backgroundColor: fitnessGoal === goal.value 
                                                    ? "rgba(229, 9, 20, 0.15)" 
                                                    : "rgba(255, 255, 255, 0.05)",
                                                border: `1px solid ${fitnessGoal === goal.value 
                                                    ? "#e50914" 
                                                    : "rgba(255, 255, 255, 0.1)"}`,
                                                borderRadius: 2,
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(229, 9, 20, 0.1)",
                                                    borderColor: "#e50914"
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 2 }}>
                                                <FormControlLabel
                                                    value={goal.value}
                                                    control={
                                                        <Radio
                                                            checked={fitnessGoal === goal.value}
                                                            onChange={() => setFitnessGoal(goal.value)}
                                                            sx={{
                                                                color: "transparent",
                                                                "&.Mui-checked": {
                                                                    color: "transparent"
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            <Typography variant="h5" sx={{ mr: 2 }}>
                                                                {goal.icon}
                                                            </Typography>
                                                            <Typography 
                                                                sx={{ 
                                                                    fontWeight: 600,
                                                                    color: fitnessGoal === goal.value 
                                                                        ? "#fff" 
                                                                        : "#b0b0b0",
                                                                    fontSize: "16px"
                                                                }}
                                                            >
                                                                {goal.value}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Generate Button */}
                <Box sx={{ 
                    mt: 6, 
                    textAlign: "center",
                    position: "relative"
                }}>
                    <Button
                        variant="contained"
                        disabled={loading || dietPreferences.length === 0 || !fitnessGoal}
                        onClick={handleGenerate}
                        startIcon={loading ? null : <TrendingUpIcon />}
                        sx={{
                            background: "linear-gradient(90deg, #e50914, #ff4d4d)",
                            color: "#fff",
                            fontWeight: 800,
                            px: 8,
                            py: 2,
                            fontSize: "18px",
                            borderRadius: "50px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            minWidth: "300px",
                            position: "relative",
                            overflow: "hidden",
                            "&:hover": {
                                background: "linear-gradient(90deg, #ff4d4d, #e50914)",
                                boxShadow: "0 10px 30px rgba(229, 9, 20, 0.4)"
                            },
                            "&:disabled": {
                                background: "rgba(255, 255, 255, 0.1)",
                                color: "rgba(255, 255, 255, 0.3)"
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
                            "Generate Meal Plan"
                        )}
                    </Button>
                    
                    {/* Info Text */}
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            display: "block", 
                            mt: 2, 
                            color: "#888",
                            fontSize: "14px"
                        }}
                    >
                        {loading ? "Creating your personalized meal plan..." : 
                         dietPreferences.length > 0 && fitnessGoal 
                            ? `Ready to create a ${fitnessGoal.toLowerCase()} plan with ${dietPreferences.length} diet preferences`
                            : "Select diet preferences and a fitness goal to continue"}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AIGenerator