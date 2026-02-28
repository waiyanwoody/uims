import axios from "axios";

/**
 * Axios instance for your app
 * Will automatically send HTTP-only JWT cookie to backend
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important: send cookies automatically
});

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
