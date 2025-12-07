import axiosClient from "./axiosClient";

// 1️⃣ Generate workout plan via AI
export const generateWorkoutPlan = async () => {
    const res = await axiosClient.post("/workout-plans/generate");
    return res.data.data;
};

// 2️⃣ Save workout plan to database
export const saveWorkoutPlan = async (body: any) => {
    const res = await axiosClient.post("/workout-plans", body);
    return res.data.data;
};

// 3️⃣ Get all saved workout plans
export const getWorkoutPlans = async () => {
    const res = await axiosClient.get("/workout-plans");
    return res.data.data;
};

// 4️⃣ Delete workout plan by ID
export const deleteWorkoutPlan = async (id: string) => {
    const res = await axiosClient.delete(`/workout-plans/${id}`);
    return res.data.data;
};
