// utils/auth.js
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// THÊM: Lưu thông tin user
export const saveUserInfo = (userInfo) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
};

// THÊM: Lấy thông tin user
export const getUserInfo = () => {
    const userInfo = localStorage.getItem(USER_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
};

// THÊM: Lấy role của user
export const getUserRole = () => {
    const userInfo = getUserInfo();
    return userInfo?.role || null;
};

// THÊM: Kiểm tra có phải admin không
export const isAdmin = () => {
    const role = getUserRole();
    return role === 'ROLE_ADMIN';
};

// THÊM: Kiểm tra đã đăng nhập chưa
export const isAuthenticated = () => {
    return getToken() !== null;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};