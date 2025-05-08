import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#343a40",
        color: "#adb5bd",
        padding: "2rem 0",
        marginTop: "4rem",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              ReviewAnalyzer
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: "1.5",
                color: "#6c757d",
              }}
            >
              AI-powered tool for analyzing review authenticity and sentiment.
              Make informed decisions with data you can trust.
            </p>
          </div>

          <div className="col-md-4">
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </h3>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                fontSize: "0.875rem",
              }}
            >
              {[
                { label: "Home", to: "/" },
                { label: "Batch Analysis", to: "/upload" },
                { label: "Single Review Analysis", to: "/analyze" },
                { label: "Dashboard", to: "/dashboard" },
              ].map((link) => (
                <li key={link.to} style={{ marginBottom: "0.5rem" }}>
                  <Link
                    to={link.to}
                    style={{ color: "#adb5bd", textDecoration: "none" }}
                    onMouseOver={(e) => (e.target.style.color = "#fff")}
                    onMouseOut={(e) => (e.target.style.color = "#adb5bd")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4">
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Contact
            </h3>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                fontSize: "0.875rem",
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>📧</span>
                support@reviewanalyzer.com
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>📍</span>
                123 Analytics Ave, Data City
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>📞</span>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "2rem",
            borderTop: "1px solid #495057",
            paddingTop: "1rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#6c757d",
          }}
        >
          © {currentYear} ReviewAnalyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
