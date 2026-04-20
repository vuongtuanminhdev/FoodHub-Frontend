// src/services/api.js
import axios from "axios";
import { getToken } from "../utils/auth"; // Import hàm getToken từ utils

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // DÙNG HÀM getToken() TỪ UTILS
    const token = getToken(); // Sẽ lấy từ key 'auth_token'
    
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    console.log(`   Token exists: ${!!token}`);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`   ✅ Authorization header added`);
    } else {
      console.warn(`   ⚠️ No token available`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi 403
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      console.error('🔒 403 Forbidden Error:');
      console.error('   URL:', error.config?.url);
      console.error('   Method:', error.config?.method);
      console.error('   Response:', error.response?.data);
      
      // Kiểm tra token hiện tại
      const token = getToken();
      console.error('   Current token:', token ? `${token.substring(0, 30)}...` : 'null');
      
      // Nếu là API admin, redirect về login
      if (error.config?.url?.includes('/admin/')) {
        console.error('   🔄 Redirecting to login...');
        logout(); // Import logout từ utils
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;