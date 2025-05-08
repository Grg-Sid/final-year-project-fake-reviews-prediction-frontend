import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import AnalysisProgress from "./components/AnalysisProgress";
import ResultViewer from "./components/ResultViewer";
import Home from "./components/Home";
import Header from "./components/Header";
import SingleReviewAnalysis from "./components/SingleReviewAnalysis";

// Main App component with routing
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Default route goes to home */}
            <Route path="/" element={<Home />} />

            {/* Main routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/analyze" element={<SingleReviewAnalysis />} />
            <Route
              path="/analysis/:analysisId"
              element={<AnalysisProgress />}
            />
            <Route path="/results/:analysisId" element={<ResultViewer />} />
            {/* <Route
              path="/review/:analysisId"
              element={<SingleReviewAnalysis />}
            /> */}

            {/* Catch all for 404 */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
