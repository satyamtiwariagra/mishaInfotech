import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api", // ✅ Your Spring Boot backend
});

// Get all states
export const getStates = () => API.get("/states");

// Get cities by state ID
export const getCities = (stateId) => API.get(`/states/${stateId}/cities`);

// Register user
export const registerUser = (data) => API.post("/users", data);

// Get users with filters
export const getUsers = (params) => API.get("/users", { params });

export default API;
