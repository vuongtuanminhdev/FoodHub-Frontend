const BASE_URL = "http://localhost:8080/api/admin/users";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const getUsers = async () => {
  const res = await fetch(BASE_URL, { headers: authHeader() });
  return res.json();
};

export const createUser = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteUserById = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
};

export const toggleUserStatus = async (id) => {
  await fetch(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: authHeader(),
  });
};