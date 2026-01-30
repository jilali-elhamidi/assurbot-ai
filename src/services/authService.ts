// authService.ts
import axios from "axios";

const API_URL = "http://localhost:8001/api"; // Backend correct

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    // Stockage local
    localStorage.setItem("userEmail", email);
    localStorage.setItem("token", response.data.token || "");
    return response.data;
  },
};
