import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Review Analysis System</h1>
        <p className="text-xl text-gray-600">
          AI-powered tool to analyze reviews for authenticity and sentiment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link to="/upload" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300 h-full border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500 mr-3"
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
              <h2 className="text-xl font-semibold">Batch Analysis</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Upload a CSV or PDF file containing multiple reviews for
              comprehensive analysis.
            </p>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
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
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
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
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
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

        <Link to="/analyze" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300 h-full border-t-4 border-purple-500">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-purple-500 mr-3"
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
              <h2 className="text-xl font-semibold">Single Review Analysis</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Analyze a single review to quickly determine its authenticity and
              sentiment.
            </p>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
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
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
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
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
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

      <div className="flex flex-wrap gap-6 mb-12">
        {/* Left Box - How It Works */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 w-full lg:w-[48%]">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((num, idx) => {
              const steps = ["Upload", "Process", "Results"];
              const descriptions = [
                "Upload your reviews file or enter a single review for analysis",
                "Our AI system analyzes each review for authenticity indicators",
                "Get detailed reports with flagged reviews and confidence scores",
              ];
              return (
                <div className="text-center" key={num}>
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <span className="text-2xl font-bold text-blue-600">
                      {num}
                    </span>
                  </div>
                  <h3 className="font-medium text-blue-800 mb-2">
                    {steps[idx]}
                  </h3>
                  <p className="text-blue-700 text-sm">{descriptions[idx]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Box - Features */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6 w-full lg:w-[48%]">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="space-y-3">
            {[
              "AI-powered authenticity detection",
              "Batch processing for multiple reviews",
              "CSV and PDF file support",
              "Detailed downloadable reports",
            ].map((feature, index) => (
              <li className="flex items-start" key={index}>
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5"
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
  );
}

export default Home;
