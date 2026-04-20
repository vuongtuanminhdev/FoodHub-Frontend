// src/services/authService.js
import api from "./api";
import { saveToken, saveUserInfo } from "../utils/auth";

export const login = async (credentials) => {
    try {
        console.log('🔐 Attempting login for:', credentials.email);
        
        const response = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password
        });
        
        console.log('📦 Login response:', response.data);
        
        // Kiểm tra cấu trúc response
        if (!response.data.token) {
            console.error('❌ No token in response! Response keys:', Object.keys(response.data));
            throw new Error('Server did not return a token');
        }
        
        // Lưu token và user info
        saveToken(response.data.token);
        saveUserInfo({
            email: response.data.email,
            name: response.data.name,
            role: response.data.role
        });
        
        console.log('✅ Login successful! Role:', response.data.role);
        console.log('   Token saved:', response.data.token.substring(0, 30) + '...');
        
        return response.data;
    } catch (error) {
        console.error('❌ Login error:', error.response?.status, error.response?.data);
        throw new Error(error.response?.data?.error || error.response?.data?.message || 'Login failed');
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        return response.data;
    } catch (error) {
        console.error('Register error:', error.response?.data);
        throw error;
    }
};