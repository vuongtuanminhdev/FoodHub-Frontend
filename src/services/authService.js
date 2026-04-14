const API_BASE = 'http://localhost:8080/api/auth';

export const register = async (userData) => {
    const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
    }

    return data;
};

export const login = async (credentials) => {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }

    // 🔥 SỬA: trả về toàn bộ data thay vì chỉ token
    // Data trả về từ server: { token, role, email, name }
    return data;
};