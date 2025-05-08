import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Review Analysis System
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#6c757d" }}>
          AI-powered tool to analyze reviews for authenticity and sentiment
        </p>
      </div>

      <div className="row" style={{ marginBottom: "3rem" }}>
        <div className="col-md-6">
          <Link
            to="/upload"
            style={{ display: "block", textDecoration: "none" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
                padding: "1.5rem",
                borderTop: "4px solid #007bff",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <svg
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#007bff",
                    marginRight: "0.75rem",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  Batch Analysis
                </h2>
              </div>
              <p style={{ color: "#6c757d", marginBottom: "1rem" }}>
                Upload a CSV or PDF file containing multiple reviews for
                comprehensive analysis.
              </p>
              <ul
                style={{
                  color: "#6c757d",
                  fontSize: "0.875rem",
                  listStyleType: "none",
                  paddingLeft: "0",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Process hundreds of reviews at once
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  CSV and PDF support
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Get detailed reports with visualizations
                </li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link
            to="/analyze"
            style={{ display: "block", textDecoration: "none" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
                padding: "1.5rem",
                borderTop: "4px solid #6f42c1",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <svg
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#6f42c1",
                    marginRight: "0.75rem",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  Single Review Analysis
                </h2>
              </div>
              <p style={{ color: "#6c757d", marginBottom: "1rem" }}>
                Analyze a single review to quickly determine its authenticity
                and sentiment.
              </p>
              <ul
                style={{
                  color: "#6c757d",
                  fontSize: "0.875rem",
                  listStyleType: "none",
                  paddingLeft: "0",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Instant results
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Confidence scoring
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Include metadata for better accuracy
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </div>

      <div className="row" style={{ marginBottom: "3rem" }}>
        <div className="col-lg-6" style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              backgroundColor: "#e9f7ff",
              border: "1px solid #b8daff",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#004085",
                marginBottom: "1rem",
              }}
            >
              How It Works
            </h2>
            <div className="row">
              {[1, 2, 3].map((num, idx) => {
                const steps = ["Upload", "Process", "Results"];
                const descriptions = [
                  "Upload your reviews file or enter a single review for analysis",
                  "Our AI system analyzes each review for authenticity indicators",
                  "Get detailed reports with flagged reviews and confidence scores",
                ];
                return (
                  <div className="col-sm-4 text-center" key={num}>
                    <div
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        width: "4rem",
                        height: "4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.75rem",
                        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#007bff",
                        }}
                      >
                        {num}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontWeight: "500",
                        color: "#004085",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {steps[idx]}
                    </h3>
                    <p style={{ color: "#0056b3", fontSize: "0.875rem" }}>
                      {descriptions[idx]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #dee2e6",
              borderRadius: "0.5rem",
              boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Features
            </h2>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {[
                "AI-powered authenticity detection",
                "Batch processing for multiple reviews",
                "CSV and PDF file support",
                "Detailed downloadable reports",
              ].map((feature, index) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                  key={index}
                >
                  <svg
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#28a745",
                      marginRight: "0.5rem",
                      marginTop: "0.125rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
