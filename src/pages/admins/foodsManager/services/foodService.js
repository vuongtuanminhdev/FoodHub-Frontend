import axios from "axios";
import { getAuthHeader } from "../../../../utils/auth";

const BASE_URL = "http://localhost:8080/api/admin";

export const getFoods = () =>
  axios.get(`${BASE_URL}/foods`, { headers: getAuthHeader() });

export const createFood = (data) =>
  axios.post(`${BASE_URL}/foods`, data, {
    headers: getAuthHeader(),
  });

export const updateFood = (id, data) =>
  axios.put(`${BASE_URL}/foods/${id}`, data, {
    headers: getAuthHeader(),
  });

export const deleteFood = (id) =>
  axios.delete(`${BASE_URL}/foods/${id}`, {
    headers: getAuthHeader(),
  });


export const getCategories = () =>
  axios.get(`${BASE_URL}/categories`, {
    headers: getAuthHeader(),
  });