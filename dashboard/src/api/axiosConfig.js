// src/api/axiosConfig.js
import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "https://mediserve-final-project.onrender.com/api/v1",
  withCredentials: true, // 🔥 Required to send cookies for authentication
  headers: {
    "Content-Type": "application/json", // Standard for JSON API requests
  },
});

export default API;
