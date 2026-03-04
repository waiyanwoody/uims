import axios from "axios";

/**
 * Axios instance for your app
 * Uses localStorage for JWT token storage
 */
const api = axios.create({
  baseURL: "http://13.212.37.15:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // Remove withCredentials if not using cookies
  // withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Add Authorization header from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * You can still keep interceptors for logging or error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear local storage to sync with backend state
        localStorage.removeItem("user");
        // Redirect to login page
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
