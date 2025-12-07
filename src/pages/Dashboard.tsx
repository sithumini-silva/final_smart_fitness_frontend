import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress
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
            const data = await getMealPlans(); // already returns array
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
        <Container sx={{ mt: 4 }}>
            <Button
                variant="contained"
                sx={{ mb: 3 }}
                onClick={() => navigate("/ai-generate")}
            >
                Generate New Meal Plan
            </Button>

            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid item xs={12} md={6} lg={4} key={plan._id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6">
                                    {new Date(plan.date).toLocaleDateString()}
                                </Typography>

                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Meals:</strong>
                                    <ul>
                                        {plan.meals.map((m: string, i: number) => (
                                            <li key={i}>{m}</li>
                                        ))}
                                    </ul>
                                </Typography>

                                <Button
                                    color="error"
                                    size="small"
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

export default Dashboard;
