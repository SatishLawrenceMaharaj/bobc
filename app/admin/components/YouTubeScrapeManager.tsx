"use client";

import { useState } from "react";

export default function YouTubeScrapeManager() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleScrape = async () => {
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/scrape-youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to scrape YouTube videos");
      }

      setStatus({
        type: "success",
        message: data.message || "YouTube videos scraped successfully!",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">YouTube Scraper</h2>

      <div className="p-4 bg-gray-50 rounded mb-4">
        <p className="text-gray-700 mb-4">
          Click the button below to fetch the latest YouTube videos from the
          configured channel and update the database.
        </p>

        <button
          onClick={handleScrape}
          disabled={loading}
          className={`px-6 py-2 rounded text-white font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Scraping..." : "Fetch YouTube Videos"}
        </button>
      </div>

      {status.type && (
        <div
          className={`p-4 rounded ${
            status.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <p className="font-medium">{status.message}</p>
        </div>
      )}
    </div>
  );
}
