"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos", { cache: "no-store" });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch videos");
        }

        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch videos"
        );
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading videos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No videos available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-md border border-red-100 hover:shadow-lg hover:scale-105 transition-all">
          <h3 className="text-2xl font-bold text-red-900 mb-3">
            Subscribe on YouTube
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Subscribe to our YouTube channel for more content, live streams, and
            community updates.
          </p>
          <a
            href="https://www.youtube.com/@bethelobcbordenarve"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition shadow-md"
          >
            Visit YouTube
            <span>▶️</span>
          </a>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 transition-all">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            Follow on Facebook
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Join our Facebook community for more content and updates.
          </p>
          <a
            href="https://www.facebook.com/bethel.obc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md"
          >
            Visit Facebook
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}