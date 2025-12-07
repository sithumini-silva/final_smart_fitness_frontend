// src/api/auth.ts
import axiosClient from './axiosClient';
import type { AuthResponse } from '../types';

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
    fullname: string;
    role: 'user' | 'admin' | 'trainer';
}

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axiosClient.post<AuthResponse>('/auth/login', payload);
    return res.data;
};

export const registerApi = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await axiosClient.post<AuthResponse>('/auth/register', payload);
    return res.data;
};
