import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      style={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <div>
              <Link
                to="/"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#4a4a4a",
                  textDecoration: "none",
                }}
              >
                ReviewAnalyzer
              </Link>
            </div>
            <nav className="ml-3 d-none d-md-flex">
              <Link
                to="/"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  backgroundColor: isActive("/") ? "#f8f9fa" : "transparent",
                  color: isActive("/") ? "#212529" : "#6c757d",
                  textDecoration: "none",
                  marginRight: "0.5rem",
                }}
              >
                Home
              </Link>
              <Link
                to="/upload"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  backgroundColor: isActive("/upload")
                    ? "#f8f9fa"
                    : "transparent",
                  color: isActive("/upload") ? "#212529" : "#6c757d",
                  textDecoration: "none",
                  marginRight: "0.5rem",
                }}
              >
                Batch Analysis
              </Link>
              <Link
                to="/analyze"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  backgroundColor: isActive("/analyze")
                    ? "#f8f9fa"
                    : "transparent",
                  color: isActive("/analyze") ? "#212529" : "#6c757d",
                  textDecoration: "none",
                }}
              >
                Single Review
              </Link>
            </nav>
          </div>
          <div className="d-flex align-items-center">
            <Link
              to="/dashboard"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#6c757d",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
