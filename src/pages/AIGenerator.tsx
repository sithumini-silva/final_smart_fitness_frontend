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
    RadioGroup
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { createMealPlan } from "../api/mealPlans";

const dietOptions = ["Vegan", "Vegetarian", "Keto", "Low-Carb"];
const fitnessGoals = ["Weight Loss", "Weight Gain", "Maintain Weight"];

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
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4">AI Meal Plan Generator</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
                Diet Preferences
            </Typography>

            <FormControl>
                <FormGroup>
                    {dietOptions.map((d) => (
                        <FormControlLabel
                            key={d}
                            control={
                                <Checkbox
                                    checked={dietPreferences.includes(d)}
                                    onChange={() => toggleDiet(d)}
                                />
                            }
                            label={d}
                        />
                    ))}
                </FormGroup>
            </FormControl>

            <Typography variant="h6" sx={{ mt: 2 }}>
                Fitness Goal
            </Typography>

            <RadioGroup
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
            >
                {fitnessGoals.map((goal) => (
                    <FormControlLabel key={goal} value={goal} control={<Radio />} label={goal} />
                ))}
            </RadioGroup>

            <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleGenerate}
            >
                {loading ? <CircularProgress size={24} /> : "Generate Meal Plan"}
            </Button>
        </Container>
    );
};

export default AIGenerator;
