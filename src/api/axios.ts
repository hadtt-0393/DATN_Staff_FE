import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use((config) => {
    const tokenJson = localStorage.getItem("accessToken");
    // const token = tokenJson ? JSON.parse(tokenJson) : null;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY3MTE3YzFhZGZhOTA4MzQzOGIzNiIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTcxNjQ4MjMzNywiZXhwIjoxNzE2NTY4NzM3fQ.ZpiX5Oc-bJ09jqZ18GJ2fYnIaQ5ZIXrg5UV0g2TzWkg"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;