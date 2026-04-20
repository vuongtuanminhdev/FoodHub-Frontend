// src/utils/auth.js
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

export const saveToken = (token) => {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const saveUserInfo = (userInfo) => {
    if (userInfo) {
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
        console.log('Saved user info:', userInfo);
    }
};

export const getUserInfo = () => {
    const userInfo = localStorage.getItem(USER_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
};

// 🔥 FIX: Chấp nhận nhiều format role
export const getUserRole = () => {
    const userInfo = getUserInfo();
    const role = userInfo?.role;
    
    // Chấp nhận cả ROLE_ADMIN, ADMIN, admin, 2, etc.
    console.log('Raw role from storage:', role);
    return role;
};

// 🔥 FIX: Kiểm tra admin linh hoạt hơn
export const isAdmin = () => {
    const role = getUserRole();
    
    // Chấp nhận nhiều dạng role
    const adminRoles = ['ROLE_ADMIN', 'ADMIN', 'admin', 2, '2'];
    const isUserAdmin = adminRoles.includes(role);
    
    console.log('Is admin check:', { role, isUserAdmin });
    return isUserAdmin;
};

export const isAuthenticated = () => {
    return getToken() !== null;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
};