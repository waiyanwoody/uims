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
    // Optional: handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      // e.g., logout user
      console.log("Unauthorized, please login again");
    }
    return Promise.reject(error);
  }
);

export default api;
