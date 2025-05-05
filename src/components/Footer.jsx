import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              ReviewAnalyzer
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              AI-powered tool for analyzing review authenticity and sentiment.
              Make informed decisions with data you can trust.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Batch Analysis", to: "/upload" },
                { label: "Single Review Analysis", to: "/analyze" },
                { label: "Dashboard", to: "/dashboard" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                support@reviewanalyzer.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                123 Analytics Ave, Data City
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-5 text-center text-xs text-gray-500">
          © {currentYear} ReviewAnalyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
