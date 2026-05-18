import axios from "axios";
import { getAuthHeader } from "../../../../utils/auth";

const BASE_URL = "http://localhost:8080/api/admin";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...getAuthHeader(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error in foodService:", error);
    return Promise.reject(error);
  }
);

export const getFoods = () => api.get("/foods");

export const createFood = (data) => api.post("/foods", data);

export const updateFood = (id, data) => api.put(`/foods/${id}`, data);

export const deleteFood = (id) => api.delete(`/foods/${id}`);

export const getCategories = () => api.get("/categories");