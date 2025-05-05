import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Export API methods
export default {
  // Basic HTTP methods
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
      // DO NOT manually set Content-Type — let Axios handle it
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
