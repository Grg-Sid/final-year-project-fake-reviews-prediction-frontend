import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await api.get("/analyses");
        setAnalyses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analyses:", err);
        setError("Failed to fetch analysis history. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success text-white";
      case "processing":
      case "queued":
      case "validating":
      case "extracting":
        return "bg-info text-white";
      case "failed":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const getAnalysisLink = (analysis) => {
    if (analysis.status === "completed") {
      return `/results/${analysis.analysis_id}`;
    } else if (
      ["processing", "queued", "validating", "extracting"].includes(
        analysis.status
      )
    ) {
      return `/analysis/${analysis.analysis_id}`;
    }
    return "#";
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "240px" }}
      >
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container my-1">
      <h2 className="fw-bold text-center mb-4">Analysis Dashboard</h2>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/upload" className="btn btn-primary">
          New Analysis
        </Link>
      </div>

      {error ? (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <div>
            <strong>Something went wrong:</strong> {error}
          </div>
          <Link to="/upload" className="btn btn-outline-light btn-sm ms-3">
            Upload New File
          </Link>
        </div>
      ) : analyses.length > 0 ? (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>File Name</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Analysis Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((analysis) => (
                <tr key={analysis.analysis_id}>
                  <td>{analysis.file_name}</td>
                  <td>{formatDate(analysis.created_at)}</td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeClass(
                        analysis.status
                      )}`}
                    >
                      {analysis.status.charAt(0).toUpperCase() +
                        analysis.status.slice(1)}
                    </span>
                  </td>
                  <td>Batch Analysis</td>
                  <td>
                    <Link
                      to={getAnalysisLink(analysis)}
                      className={`btn btn-sm btn-link p-0 ${
                        analysis.status === "failed"
                          ? "disabled text-muted"
                          : ""
                      }`}
                    >
                      {analysis.status === "completed"
                        ? "View Results"
                        : [
                            "processing",
                            "queued",
                            "validating",
                            "extracting",
                          ].includes(analysis.status)
                        ? "View Progress"
                        : "Details"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-secondary text-center p-4">
          <p className="mb-3">You haven’t submitted any analyses yet.</p>
          <Link to="/upload" className="btn btn-primary">
            Start Your First Analysis
          </Link>
        </div>
      )}

      {!error && (
        <div className="mt-4">
          <Link to="/upload" className="btn btn-outline-primary">
            Add More Files
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
