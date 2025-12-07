// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, registerApi } from '../api/auth';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        fullname: string,
        role: 'user' | 'admin' | 'trainer'
    ) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }
        setInitialized(true);
    }, []);

    const login = async (email: string, password: string) => {
        const res = await loginApi({ email, password });

        const accessToken = res.data.accessToken;
        const userData: User = {
            _id: '', // if backend sends it, map here
            email,
            fullname: res.data.fullname,
            role: res.data.role as User['role'],
            subscriptionStatus: 'active', // adjust if backend sends this
        };

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (
        email: string,
        password: string,
        fullname: string,
        role: 'user' | 'admin' | 'trainer'
    ) => {
        const res = await registerApi({ email, password, fullname, role });

        const accessToken = res.data.accessToken;
        const userData: User = {
            _id: '',
            email,
            fullname: res.data.fullname,
            role: res.data.role as User['role'],
            subscriptionStatus: 'active',
        };

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    if (!initialized) return null; // prevent flicker

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
