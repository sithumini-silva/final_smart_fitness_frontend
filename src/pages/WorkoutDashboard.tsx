import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    CircularProgress,
} from "@mui/material";

import { getWorkoutPlans, deleteWorkoutPlan } from "../api/workoutPlans";

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
        await deleteWorkoutPlan(id);
        loadWorkouts();
    };

    useEffect(() => {
        loadWorkouts();
    }, []);

    if (loading)
        return (
            <Container sx={{ mt: 4, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Workout Plans
            </Typography>

            <Grid container spacing={3}>
                {workouts.map((plan) => (
                    <Grid item xs={12} md={6} lg={4} key={plan._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {new Date(plan.date).toLocaleDateString()}
                                </Typography>

                                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                    Exercises:
                                </Typography>

                                <ul>
                                    {plan.exercises.map((ex: string, idx: number) => (
                                        <li key={idx}>{ex}</li>
                                    ))}
                                </ul>

                                <Button
                                    color="error"
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
    );
};

export default WorkoutDashboard;
