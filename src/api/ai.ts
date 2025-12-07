import axiosClient from "./axiosClient";

export const generateAIPlan = async (payload: { userDetails: string; goal: string }) => {
    const res = await axiosClient.post("/ai/generate", payload);
    return res.data;
};
