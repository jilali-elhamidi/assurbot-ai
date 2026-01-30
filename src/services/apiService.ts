// apiService.ts
import axios from "axios";

const API_URL = "http://localhost:8001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiService = {
  getDashboardData: async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) throw new Error("Email utilisateur non défini !");
    const response = await api.get(`/dashboard/summary?email=${email}`);
    return response.data;
  },
  // Autres méthodes : getContracts, getClaims, getProfile...
};
