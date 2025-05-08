import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
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
        console.log("Analysis data fetched:", response.data);

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
    if (!["pdf", "csv"].includes(format)) {
      console.error('Invalid format specified. Must be "pdf" or "csv".');
      return;
    }

    try {
      console.log(
        `Attempting to download ${format.toUpperCase()} for analysis ID: ${analysisId}`
      );

      // Determine the correct MIME type and Accept header based on format
      const mimeType = format === "pdf" ? "application/pdf" : "text/csv";
      const acceptHeader = format === "pdf" ? "application/pdf" : "text/csv";

      // Make the GET request using your 'api' instance
      const response = await api.get(
        `/analysis/${analysisId}/download?format=${format}`,
        {
          responseType: "blob",
          headers: {
            Accept: acceptHeader,
          },
        }
      );

      console.log(
        `Received response for ${format.toUpperCase()}. Status: ${
          response.status
        }`
      );
      console.log("Response headers:", response.headers);
      console.log(
        `Response data type received: ${response.data.type}, size: ${response.data.size}`
      );

      const blob = new Blob([response.data], { type: mimeType });
      console.log(`Created blob with type: ${blob.type}, size: ${blob.size}`);

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      let filename = `${analysisId}.${format}`; // Default filename

      if (contentDisposition) {
        console.log("Content-Disposition header found:", contentDisposition);
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
          console.log("Extracted filename from header:", filename);
        } else {
          console.warn(
            "Could not extract filename from Content-Disposition header. Using default."
          );
        }
      } else {
        console.warn(
          "Content-Disposition header not found. Using default filename."
        );
      }

      // --- Using FileSaver.js to save the blob ---
      saveAs(blob, filename);
      console.log(
        `Download initiated using FileSaver.js for filename: ${filename}`
      );
    } catch (error) {
      console.error(`Error downloading ${format.toUpperCase()} file:`, error);

      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        console.error("Error response headers:", error.response.headers);

        if (error.response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            console.error(
              "Error response data (attempted text read):",
              reader.result
            );
          };
          reader.onerror = () => {
            console.error("Failed to read error response data as text.");
          };
          reader.readAsText(error.response.data);
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div
          style={{
            animation: "spin 1s linear infinite",
            borderRadius: "50%",
            height: "48px",
            width: "48px",
            border: "4px solid #3b82f6",
            borderTopColor: "transparent",
          }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#b91c1c",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div
        style={{
          backgroundColor: "#fef9c3",
          border: "1px solid #fde68a",
          color: "#b45309",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        No analysis found with ID: {analysisId}
      </div>
    );
  }

  // This is a placeholder since we don't have actual result data yet
  const chartData = {
    labels: ["Authentic Reviews", "Flagged Reviews"],
    datasets: [
      {
        data: [analysis.total_reviews, analysis.flagged_reviews],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container my-1">
      <h2 className="fw-bold text-center mb-4">Analysis Results</h2>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "24px",
        }}
      >
        <div style={{ padding: "24px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Summary
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "12px",
                }}
              >
                Result Distribution
              </h3>
              <div style={{ height: "256px" }}>
                <Pie
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "12px",
                }}
              >
                Key Metrics
              </h3>
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontWeight: "500" }}>Analysis ID:</span>
                  <span style={{ marginLeft: "8px", color: "#4b5563" }}>
                    {analysis.analysis_id}
                  </span>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontWeight: "500" }}>Completed:</span>
                  <span style={{ marginLeft: "8px", color: "#4b5563" }}>
                    {new Date(analysis.updated_at).toLocaleString()}
                  </span>
                </div>

                {/* Placeholder metrics - replace with actual data in production */}
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontWeight: "500" }}>Total Reviews: </span>
                  <span style={{ marginLeft: "8px", color: "#4b5563" }}>
                    {analysis.total_reviews}
                  </span>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontWeight: "500" }}>Flagged Reviews: </span>
                  <span style={{ marginLeft: "8px", color: "#4b5563" }}>
                    {analysis.flagged_reviews}
                  </span>
                </div>

                <div>
                  <span style={{ fontWeight: "500" }}>
                    Flagged Percentage:{" "}
                  </span>
                  <span style={{ marginLeft: "8px", color: "#4b5563" }}>
                    {(
                      (analysis.flagged_reviews / analysis.total_reviews) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download options */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Download Results
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "16px" }}>
          Download the complete analysis results in your preferred format.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleDownload("pdf")}
          >
            <svg
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
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
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              backgroundColor: "#16a34a",
              color: "#ffffff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleDownload("csv")}
          >
            <svg
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            color: "#374151",
            backgroundColor: "#e5e7eb",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/upload")}
        >
          Analyze New File
        </button>
      </div>
    </div>
  );
}

export default ResultViewer;
