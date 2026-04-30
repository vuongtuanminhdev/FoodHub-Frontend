// src/utils/auth.js

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_info";

// ===============================
// 🔐 TOKEN
// ===============================
export const saveToken = (token) => {
  if (token && typeof token === "string") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  // 🔥 check token hợp lệ (JWT phải có 3 phần)
  if (!token || token.split(".").length !== 3) {
    return null;
  }

  return token;
};

// ===============================
// 👤 USER INFO
// ===============================
export const saveUserInfo = (userInfo) => {
  if (userInfo) {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    console.log("Saved user info:", userInfo);
  }
};

export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem(USER_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (e) {
    console.error("Parse userInfo error:", e);
    return null;
  }
};

// ===============================
// 🎭 ROLE
// ===============================
export const getUserRole = () => {
  const userInfo = getUserInfo();
  let role = userInfo?.role;

  // 🔥 normalize role
  if (role && !role.startsWith("ROLE_")) {
    role = "ROLE_" + role.toUpperCase();
  }

  console.log("Normalized role:", role);
  return role;
};

export const isAdmin = () => {
  const role = getUserRole();
  const isUserAdmin = role === "ROLE_ADMIN";

  console.log("Is admin check:", { role, isUserAdmin });
  return isUserAdmin;
};

// ===============================
// 🔑 AUTH
// ===============================
export const isAuthenticated = () => {
  return getToken() !== null;
};

// ===============================
// 🔥 HELPER: HEADER CHUẨN
// ===============================
export const getAuthHeader = () => {
  const token = getToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

// ===============================
// 🚪 LOGOUT
// ===============================
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/login";
};
