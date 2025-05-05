import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AnalysisStatus({ analysisId: propAnalysisId }) {
  const { analysisId: paramAnalysisId } = useParams();
  const analysisId = propAnalysisId || paramAnalysisId;

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Polling interval for status updates (in milliseconds)
  const POLLING_INTERVAL = 2000;

  useEffect(() => {
    if (!analysisId) return;

    const fetchStatus = async () => {
      try {
        const response = await api.get(`/analysis/${analysisId}`);
        setAnalysis(response.data);
        setLoading(false);

        // If completed, navigate to results page
        if (response.data.status === "completed") {
          navigate(`/results/${analysisId}`);
        }
      } catch (err) {
        console.error("Error fetching analysis status:", err);
        setError("Failed to fetch analysis status. Please try again later.");
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStatus();

    // Set up polling for status updates
    const intervalId = setInterval(() => {
      if (analysis?.status === "completed" || analysis?.status === "failed") {
        clearInterval(intervalId);
      } else {
        fetchStatus();
      }
    }, POLLING_INTERVAL);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [analysisId, analysis?.status, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        No analysis found with ID: {analysisId}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Status</h2>

      {/* Status information */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Status:</span>
          <StatusBadge status={analysis.status} />
        </div>

        <div className="mb-2">
          <span className="font-medium">Analysis ID:</span>
          <span className="ml-2 text-gray-600">{analysis.analysis_id}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium">Created:</span>
          <span className="ml-2 text-gray-600">
            {new Date(analysis.created_at).toLocaleString()}
          </span>
        </div>

        <div>
          <span className="font-medium">Last Updated:</span>
          <span className="ml-2 text-gray-600">
            {new Date(analysis.updated_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress bar for processing status */}
      {analysis.status === "processing" && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress:</span>
            <span>{Math.round(analysis.progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${analysis.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error message if failed */}
      {analysis.status === "failed" && analysis.error_message && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
          <span className="font-medium">Error:</span> {analysis.error_message}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 mr-2"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        {analysis.status === "completed" && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate(`/results/${analysisId}`)}
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      label: "Pending",
    },
    processing: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      label: "Processing",
    },
    completed: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      label: "Completed",
    },
    failed: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      label: "Failed",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  );
}

export default AnalysisStatus;
