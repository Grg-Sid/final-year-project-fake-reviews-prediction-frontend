import React, { useState } from "react";
import api from "../services/api";

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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Analyze Single Review</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="review_content"
            >
              Review Content *
            </label>
            <textarea
              id="review_content"
              name="review_content"
              value={formData.review_content}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the review text here..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="useful_count"
              >
                Useful Votes
              </label>
              <input
                type="number"
                id="useful_count"
                name="useful_count"
                value={formData.useful_count}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="review_count"
              >
                Total Reviews
              </label>
              <input
                type="number"
                id="review_count"
                name="review_count"
                value={formData.review_count}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="friend_count"
              >
                Friend Count
              </label>
              <input
                type="number"
                id="friend_count"
                name="friend_count"
                value={formData.friend_count}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
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
                  Analyzing...
                </span>
              ) : (
                "Analyze Review"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results display */}
      {result && (
        <div
          className={`bg-white rounded-lg shadow p-6 mb-6 border-l-4 ${
            result.flagged ? "border-red-500" : "border-green-500"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>

          <div className="mb-4">
            <div className="flex items-center mb-3">
              <span className="font-medium mr-2">Status: </span>
              {result.flagged ? (
                <span className="bg-red-100 text-red-800 text-sm px-2.5 py-0.5 rounded-full">
                  Flagged ⚠️
                </span>
              ) : (
                <span className="bg-green-100 text-green-800 text-sm px-2.5 py-0.5 rounded-full">
                  Authentic ✓
                </span>
              )}
            </div>

            <div className="mb-3">
              <span className="font-medium">Confidence: </span>
              <span className="ml-2">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <div>
              <span className="font-medium">Process Time: </span>
              <span className="ml-2">
                {result.process_time.toFixed(3)} seconds
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded p-4 mb-4">
            <h3 className="font-medium mb-2">Review Content: </h3>
            <p className="text-gray-700">{formData.review_content}</p>
          </div>

          <div className="text-sm text-gray-500">
            <p>
              This result is based on an automated analysis. For more accurate
              results, please consider submitting multiple reviews via batch
              processing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleReviewAnalysis;
