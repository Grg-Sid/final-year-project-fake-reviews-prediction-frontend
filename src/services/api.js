import axios from "axios";

// Create axios instance with base URL and default headers
const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors - redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Redirecting could also be handled by a central auth service
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Export API methods for different entities
export default {
  // Analyses related endpoints
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),

  // File upload with progress tracking
  uploadFile: (file, analysisType, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("analysis_type", analysisType);

    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Analysis specific methods
  getAnalyses: () => api.get("/analyses"),
  getAnalysisById: (id) => api.get(`/analyses/${id}`),
  getAnalysisStatus: (id) => api.get(`/analyses/${id}/status`),
  getAnalysisResults: (id) => api.get(`/analyses/${id}/results`),
};
