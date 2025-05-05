// src/components/FileUploader.jsx

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("csv"); // Default file type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type based on selected fileType
    const validTypes = {
      csv: ["text/csv", "application/vnd.ms-excel"],
      pdf: ["application/pdf"],
      json: ["application/json"],
    };

    if (!validTypes[fileType].includes(selectedFile.type)) {
      setError(
        `Invalid file type. Please select a ${fileType.toUpperCase()} file.`
      );
      setFile(null);
      fileInputRef.current.value = "";
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      setFile(null);
      fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleTypeChange = (e) => {
    setFileType(e.target.value);

    // Clear file when changing type
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProgress(0);

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_type", fileType);

      // Custom axios config for progress tracking
      const response = await api.post("/analysis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      // Navigate to analysis page with the ID
      navigate(`/analysis/${response.data.analysis_id}`);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(
        err.response?.data?.detail ||
          "An error occurred while uploading the file. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Batch Analysis</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select File Type
            </label>
            <div className="flex flex-wrap gap-4">
              <label
                className={`
                flex items-center px-4 py-2 rounded-md cursor-pointer
                ${
                  fileType === "csv"
                    ? "bg-blue-100 border-blue-500 border-2"
                    : "bg-gray-100 border border-gray-300"
                }
              `}
              >
                <input
                  type="radio"
                  name="fileType"
                  value="csv"
                  checked={fileType === "csv"}
                  onChange={handleTypeChange}
                  className="sr-only"
                />
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                CSV File
              </label>

              <label
                className={`
                flex items-center px-4 py-2 rounded-md cursor-pointer
                ${
                  fileType === "pdf"
                    ? "bg-red-100 border-red-500 border-2"
                    : "bg-gray-100 border border-gray-300"
                }
              `}
              >
                <input
                  type="radio"
                  name="fileType"
                  value="pdf"
                  checked={fileType === "pdf"}
                  onChange={handleTypeChange}
                  className="sr-only"
                />
                <svg
                  className="w-5 h-5 mr-2 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                PDF Document
              </label>

              <label
                className={`
                flex items-center px-4 py-2 rounded-md cursor-pointer
                ${
                  fileType === "json"
                    ? "bg-yellow-100 border-yellow-500 border-2"
                    : "bg-gray-100 border border-gray-300"
                }
              `}
              >
                <input
                  type="radio"
                  name="fileType"
                  value="json"
                  checked={fileType === "json"}
                  onChange={handleTypeChange}
                  className="sr-only"
                />
                <svg
                  className="w-5 h-5 mr-2 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                JSON Data
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="file"
            >
              Upload {fileType.toUpperCase()} File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
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
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {fileType === "csv" && "CSV file containing review data"}
                    {fileType === "pdf" && "PDF document with review content"}
                    {fileType === "json" && "JSON file with review data"}
                  </p>
                  {file && (
                    <p className="mt-2 text-sm text-blue-600 font-medium">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={
                    fileType === "csv"
                      ? ".csv"
                      : fileType === "pdf"
                      ? ".pdf"
                      : ".json"
                  }
                />
              </label>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {loading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {progress === 100 ? "Processing..." : `Uploading: ${progress}%`}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || !file}
            >
              {loading ? "Processing..." : "Upload & Analyze"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">File Requirements</h2>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">For CSV Files:</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>First row must contain column headers</li>
            <li>Must include a "review_text" or "content" column</li>
            <li>
              Optional: Include metadata columns like "rating", "helpful_votes",
              etc.
            </li>
            <li>Maximum 10,000 reviews per file</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">For PDF Files:</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Text must be selectable (not scanned images)</li>
            <li>System will attempt to extract review content automatically</li>
            <li>
              Each review should be clearly separated by spacing or formatting
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">For JSON Files:</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Must be an array of review objects</li>
            <li>
              Each object must have a "text", "content", or "review" property
            </li>
            <li>
              Optional: Include metadata like "rating", "helpful_votes", etc.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
