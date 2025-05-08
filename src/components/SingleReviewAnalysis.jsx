import React, { useState } from "react";
import api from "../services/api";

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: "0.25rem",
  padding: "0.5rem",
  outline: "none",
};

const labelStyle = {
  display: "block",
  color: "#4a4a4a",
  fontWeight: 500,
  marginBottom: "0.5rem",
};

const sectionBoxStyle = {
  backgroundColor: "white",
  borderRadius: "0.5rem",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
  padding: "1.5rem",
  marginBottom: "1.5rem",
};

function SingleReviewAnalysis() {
  const [formData, setFormData] = useState({
    review_content: "",
    useful_count: 0,
    review_count: 0,
    friend_count: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "review_content" ? value : parseInt(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.review_content.trim()) {
      setError("Review content cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);
      const response = await api.post("/predict", formData);
      setResult(response.data);
    } catch (err) {
      console.error("Error analyzing review:", err);
      setError(
        err.response?.data?.detail ||
          "An error occurred while analyzing the review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-1">
      <h2 className="fw-bold text-center mb-4">Upload Reviews File</h2>

      <div style={sectionBoxStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="review_content" style={labelStyle}>
              Review Content *
            </label>
            <textarea
              id="review_content"
              name="review_content"
              value={formData.review_content}
              onChange={handleChange}
              rows="5"
              placeholder="Enter the review text here..."
              style={inputStyle}
              required
            />
          </div>

          <div className="row" style={{ marginBottom: "1.5rem" }}>
            {[
              { id: "useful_count", label: "Useful Votes" },
              { id: "review_count", label: "Total Reviews" },
              { id: "friend_count", label: "Friend Count" },
            ].map(({ id, label }) => (
              <div className="col-md-4" key={id}>
                <label htmlFor={id} style={labelStyle}>
                  {label}
                </label>
                <input
                  type="number"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  min="0"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          {error && (
            <div
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "0.25rem",
                border: "none",
                cursor: "pointer",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      marginRight: "0.5rem",
                      height: "1rem",
                      width: "1rem",
                      color: "white",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      style={{ opacity: 0.25 }}
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      style={{ opacity: 0.75 }}
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Review"
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div
          style={{
            ...sectionBoxStyle,
            borderLeft: `4px solid ${result.flagged ? "red" : "green"}`,
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Analysis Result
          </h2>

          <div style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: "500", marginRight: "0.5rem" }}>
                Status:
              </span>
              <span
                style={{
                  backgroundColor: result.flagged ? "#f8d7da" : "#d4edda",
                  color: result.flagged ? "#721c24" : "#155724",
                  fontSize: "0.875rem",
                  padding: "0.25rem 0.625rem",
                  borderRadius: "9999px",
                }}
              >
                {result.flagged ? "Flagged ⚠️" : "Authentic ✓"}
              </span>
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: "500" }}>Confidence:</span>
              <span style={{ marginLeft: "0.5rem" }}>
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <div>
              <span style={{ fontWeight: "500" }}>Process Time:</span>
              <span style={{ marginLeft: "0.5rem" }}>
                {result.process_time.toFixed(3)} seconds
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "0.25rem",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
              Review Content:
            </h3>
            <p style={{ color: "#4a4a4a" }}>{formData.review_content}</p>
          </div>

          <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>
            <p>
              This result is based on an automated analysis. For more accurate
              insights, consider using batch processing with multiple reviews.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleReviewAnalysis;
