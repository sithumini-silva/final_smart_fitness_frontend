import React, { useState } from "react";
import { Container, Button, Typography, CircularProgress, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { generateWorkoutPlan, saveWorkoutPlan } from "../api/workoutPlans";

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
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4">AI Workout Plan Generator</Typography>

            <Button variant="contained" fullWidth onClick={handleGenerate} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Generate Workout Plan"}
            </Button>

            {generated && (
                <>
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Fitness Goal: {generated.fitnessGoal}
                    </Typography>

                    <List>
                        {generated.exercises.map((ex: string, idx: number) => (
                            <ListItem key={idx}>{ex}</ListItem>
                        ))}
                    </List>

                    <Button variant="contained" color="success" fullWidth onClick={handleSave}>
                        Save Workout Plan
                    </Button>
                </>
            )}
        </Container>
    );
};

export default WorkoutGenerator;
