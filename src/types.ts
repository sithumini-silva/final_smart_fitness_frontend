export interface User {
  _id: string;
  email: string;
  fullname: string;
  role: 'user' | 'admin' | 'trainer';
  subscriptionStatus: string;
}

export interface MealPlan {
  _id: string;
  userId: string;
  date: string;
  meals: string[];
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface AuthResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    fullname: string;
    role: string;
  };
}
