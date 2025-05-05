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

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    setError("");

    // Validate file type
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

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Step 1: Upload the file
      const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      const uploadResponse = await api.post("/uploads/review-file", formData);

      // Step 2: Process the uploaded file
      const analysisResponse = await api.post(
        `/analysis/process-file/${uploadResponse.data.upload_id}`
      );

      // Notify parent component of successful upload and processing
      if (onUploadSuccess) {
        onUploadSuccess(uploadResponse.data, analysisResponse.data);
      }

      // Navigate to the analysis status page
      navigate(`/analysis/${analysisResponse.data.analysis_id}`);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(
        err.response?.data?.detail ||
          "An error occurred while uploading the file. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Reviews File</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer mb-4
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              ${error ? "border-red-500" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])}
              accept=".csv,.pdf,.xls,.xlsx"
            />

            {file ? (
              <div>
                <div className="text-green-600 font-medium mb-2">
                  ✓ File selected
                </div>
                <p className="text-gray-700">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            ) : (
              <div>
                <svg
                  className="w-12 h-12 mx-auto text-gray-400 mb-3"
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
                  />
                </svg>
                <p className="text-gray-600 mb-1">
                  Drag and drop your file here, or click to select
                </p>
                <p className="text-gray-500 text-sm">
                  Supported formats: CSV, PDF (up to 10MB)
                </p>
              </div>
            )}
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={!file || uploading}
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload and Analyze"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-800 font-medium mb-2">What to expect:</h3>
        <ul className="list-disc pl-5 text-blue-700 text-sm">
          <li className="mb-1">
            Your file will be securely uploaded for analysis
          </li>
          <li className="mb-1">
            The system will analyze each review for authenticity
          </li>
          <li className="mb-1">
            Results will be available as a downloadable PDF and CSV
          </li>
          <li>Large files may take a few moments to process</li>
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
