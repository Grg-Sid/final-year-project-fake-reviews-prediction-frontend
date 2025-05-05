import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import api from "../services/api";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function ResultViewer() {
  const { analysisId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.get(`/analysis/${analysisId}`);
        setAnalysis(response.data);

        if (response.data.status !== "completed") {
          navigate(`/analysis/${analysisId}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching analysis results:", err);
        setError("Failed to fetch analysis results. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId, navigate]);

  const handleDownload = async (format) => {
    try {
      // Using window.open for direct download
      window.open(
        `${api.defaults.baseURL}/analysis/${analysisId}/download?format=${format}`,
        "_blank"
      );
    } catch (err) {
      console.error(`Error downloading ${format} file:`, err);
      setError(
        `Failed to download ${format.toUpperCase()} file. Please try again later.`
      );
    }
  };

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

  // This is a placeholder since we don't have actual result data yet
  // In a real app, you'd fetch summary data from the API
  const chartData = {
    labels: ["Authentic Reviews", "Flagged Reviews"],
    datasets: [
      {
        data: [70, 30], // Example data - replace with actual statistics
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Analysis Results</h1>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Result Distribution</h3>
              <div className="h-64">
                <Pie
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Key Metrics</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-3">
                  <span className="font-medium">Analysis ID:</span>
                  <span className="ml-2 text-gray-600">
                    {analysis.analysis_id}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="font-medium">Completed:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(analysis.updated_at).toLocaleString()}
                  </span>
                </div>

                {/* Placeholder metrics - replace with actual data in production */}
                <div className="mb-3">
                  <span className="font-medium">Total Reviews:</span>
                  <span className="ml-2 text-gray-600">100</span>
                </div>

                <div className="mb-3">
                  <span className="font-medium">Flagged Reviews:</span>
                  <span className="ml-2 text-gray-600">30 (30%)</span>
                </div>

                <div>
                  <span className="font-medium">Average Confidence:</span>
                  <span className="ml-2 text-gray-600">0.78</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download options */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Download Results</h2>
        <p className="text-gray-600 mb-4">
          Download the complete analysis results in your preferred format.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => handleDownload("pdf")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                clipRule="evenodd"
              />
            </svg>
            Download PDF Report
          </button>

          <button
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => handleDownload("csv")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 15.586V12a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Download CSV Data
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mb-6">
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/upload")}
        >
          Analyze New File
        </button>
      </div>
    </div>
  );
}

export default ResultViewer;
