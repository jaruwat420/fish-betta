import apiClient from './api';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    subscription: {
        plan: string;
        status: string;
        expiresAt?: string;
    };
    lastLoginAt?: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface RegisterResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

class AuthService {
    async login(data: LoginData): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', data);

        // Store token in localStorage
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    }

    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);

        // Store token in localStorage
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    }

    async getCurrentUser(): Promise<User> {
        return await apiClient.get<User>('/auth/me');
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
export default authService;
