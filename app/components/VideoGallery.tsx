"use client";

import VideoCard from "./VideoCard";
import { youtubeVideos } from "../data/youtubeVideos";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
}

export default function VideoGallery() {
  const videos: Video[] =
    youtubeVideos.length > 0 ? youtubeVideos : [];

  return (
    <div>
      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No videos available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {/* YouTube CTA */}
      <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Follow Us on YouTube</h3>
        <p className="text-gray-700 mb-4">
          Subscribe to our YouTube page for more content, live streams, and community updates.
        </p>
        <a
          href="https://www.youtube.com/@bethelobcbordenarve"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Visit YouTube Page →
        </a>
      </div>

      {/* Facebook CTA */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Follow Us on Facebook</h3>
        <p className="text-gray-700 mb-4">
          Visit our Facebook page for more content and community updates.
        </p>
        <a
          href="https://www.facebook.com/bethel.obc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Visit Facebook Page →
        </a>
      </div>
    </div>
  );
}
