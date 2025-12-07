import axiosClient from "./axiosClient";

// ✅ Get all meal plans for the logged-in user
export const getMealPlans = async () => {
    const res = await axiosClient.get("/meal-plans");
    return res.data.data;  // backend returns { data: [...] }
};

// ✅ Create a new meal plan
export const createMealPlan = async (body: any) => {
    const res = await axiosClient.post("/meal-plans", body);
    return res.data.data;  // backend returns { data: {...} }
};

// ✅ Delete a meal plan by ID
export const deleteMealPlan = async (id: string) => {
    const res = await axiosClient.delete(`/meal-plans/${id}`);
    return res.data;
};
