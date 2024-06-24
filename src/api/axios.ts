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
    const token = tokenJson ? JSON.parse(tokenJson) : null;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY3MTE3YzFhZGZhOTA4MzQzOGIzNiIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTcxNjgxODUyNSwiZXhwIjoxNzE2OTA0OTI1fQ.HNyIrHgCuSFcDV5p47h2P0zxWBHoDmEvia7zl82cjVY"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;