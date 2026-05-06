import axios from "axios";
import { getAuthHeader } from "../../../../utils/auth";

const API_URL = "http://localhost:8080/api/admin";

export const getFoods = () =>
  axios.get(`${API_URL}/foods`, { headers: getAuthHeader() });

export const getCategories = () =>
  axios.get(`${API_URL}/categories`, { headers: getAuthHeader() });

export const createFood = (data) =>
  axios.post(`${API_URL}/foods`, data, { headers: getAuthHeader() });

export const updateFood = (id, data) =>
  axios.put(`${API_URL}/foods/${id}`, data, { headers: getAuthHeader() });

export const deleteFood = (id) =>
  axios.delete(`${API_URL}/foods/${id}`, { headers: getAuthHeader() });