import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AnalysisProgress() {
  const { analysisId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.get(`/analysis/${analysisId}`);
        setAnalysis(response.data);
        setProgress(response.data.progress || 0); // Set initial progress
        if (response.data.progress === 100) {
          navigate(`/results/${analysisId}`); // Redirect if completed
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Failed to fetch analysis status. Please try again later.");
        setLoading(false);
      }
    };

    // Initial fetch
    fetchAnalysis();

    // Polling for status updates
    const intervalId = setInterval(fetchAnalysis, 3000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [analysisId, navigate]);

  const getStatusMessage = () => {
    if (!analysis) return "Initializing...";

    switch (analysis.status) {
      case "queued":
        return "Analysis queued. Waiting to start...";
      case "processing":
        return "Analyzing reviews. This may take several minutes...";
      case "validating":
        return "Validating file format and content...";
      case "extracting":
        return "Extracting review content...";
      case "failed":
        return "Analysis failed.";
      default:
        return "Processing...";
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div className="container my-1">
      <h2 className="fw-bold text-center mb-4">Analysis in Progress</h2>

      <div className="card shadow p-4 mb-5">
        <div className="mb-4">
          <h2 className="h5">Analysis Status</h2>

          <div className="progress mb-4" style={{ height: "2.5rem" }}>
            <div
              className={`progress-bar ${error ? "bg-danger" : "bg-primary"}`}
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <div className="d-flex align-items-center mb-4">
            <span className="fw-medium me-2">Status: </span>
            <span
              className={`badge ${
                error ? "bg-danger" : "bg-primary"
              } text-white`}
            >
              {error ? "Error" : analysis?.status || "Processing"}
            </span>
          </div>

          <p>{error || getStatusMessage()}</p>
        </div>

        {analysis && (
          <div className="bg-light p-4 rounded">
            <div className="mb-3">
              <strong>Analysis ID:</strong> <span>{analysis.analysis_id}</span>
            </div>
            <div className="mb-3">
              <strong>Started:</strong>{" "}
              <span>{new Date(analysis.created_at).toLocaleString()}</span>
            </div>
            <div className="mb-3">
              <strong>File Name:</strong>{" "}
              <span>{analysis.file_name || "Not available"}</span>
            </div>
            <div>
              <strong>File Type:</strong>{" "}
              {analysis.file_name?.split(".").pop() || "Unknown"}
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-muted mb-4">
          This analysis is being processed. You can close this page and check
          the results later by returning to the dashboard.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisProgress;
