import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    setError("");
    const validTypes = [
      "text/csv",
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Only CSV and PDF files are supported");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file to upload");

    try {
      setUploading(true);
      setError("");
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await api.post("/uploads/review-file", formData);
      const analysisResponse = await api.post(
        `/analysis/process-file/${uploadResponse.data.upload_id}`
      );

      onUploadSuccess?.(uploadResponse.data, analysisResponse.data);
      navigate(`/analysis/${analysisResponse.data.analysis_id}`);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(
        err.response?.data?.detail ||
          "An error occurred while uploading the file."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container my-1">
      <h2 className="fw-bold text-center mb-4">Upload Reviews File</h2>

      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div
            className={`drop-zone mb-3 p-5 text-center border border-3 rounded ${
              dragActive ? "border-primary bg-light" : "border-secondary"
            } ${error && "border-danger"}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              onChange={(e) => handleFileChange(e.target.files[0])}
              accept=".csv,.pdf,.xls,.xlsx"
            />

            {file ? (
              <div className="text-success">
                <strong>✓ File selected:</strong>{" "}
                <span>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ) : (
              <>
                <svg
                  width="100"
                  height="100"
                  className="text-muted mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-muted">
                  Drag & drop or click to select file
                </p>
                <p className="text-secondary small">
                  Accepted formats: CSV, PDF (Max: 10MB)
                </p>
              </>
            )}
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!file || uploading}
            >
              {uploading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Uploading...
                </>
              ) : (
                "Upload and Analyze"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="alert alert-info mt-4 shadow-sm">
        <h5 className="text-primary fw-semibold">What to expect:</h5>
        <ul className="mb-0 ps-3 small">
          <li>Your file will be securely uploaded for analysis</li>
          <li>Each review will be assessed for authenticity</li>
          <li>Downloadable reports will be available (PDF & CSV)</li>
          <li>Processing may take a few moments for larger files</li>
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
