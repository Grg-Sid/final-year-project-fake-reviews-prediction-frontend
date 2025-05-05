// src/components/AnalysisProgress.jsx

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

        // Calculate progress based on status
        switch (response.data.status) {
          case "queued":
            setProgress(10);
            break;
          case "processing":
            setProgress(50);
            break;
          case "completed":
            setProgress(100);
            // Redirect to results page if completed
            navigate(`/results/${analysisId}`);
            break;
          case "failed":
            setError("Analysis failed. Please try again or contact support.");
            setProgress(0);
            break;
          default:
            setProgress(25);
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
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Analysis in Progress</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Analysis Status</h2>

          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  error ? "bg-red-600" : "bg-blue-600"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <span className="font-medium mr-2">Status: </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-sm ${
                error ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {error ? "Error" : analysis?.status || "Processing"}
            </span>
          </div>

          <p className="text-gray-600">{error || getStatusMessage()}</p>
        </div>

        {analysis && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-3">
              <span className="font-medium">Analysis ID: </span>
              <span className="ml-2 text-gray-600">{analysis.analysis_id}</span>
            </div>

            <div className="mb-3">
              <span className="font-medium">Started: </span>
              <span className="ml-2 text-gray-600">
                {new Date(analysis.created_at).toLocaleString()}
              </span>
            </div>

            <div className="mb-3">
              <span className="font-medium">File Name: </span>
              <span className="ml-2 text-gray-600">
                {analysis.file_name || "Not available"}
              </span>
            </div>

            <div>
              <span className="font-medium">File Type: </span>
              <span className="ml-2 text-gray-600">
                {analysis.file_type?.toUpperCase() || "Unknown"}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          This analysis is being processed. You can close this page and check
          the results later by returning to the dashboard.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
