"use client";

import { Sermon } from "../data/sermons";

interface SermonCardProps {
  sermon: Sermon;
}

export default function SermonCard({ sermon }: SermonCardProps) {
  const formattedDate = new Date(sermon.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">{sermon.title}</h3>
            <div className="space-y-1">
              <p className="text-sm text-blue-100 font-medium">By {sermon.speaker}</p>
              <p className="text-xs text-blue-200 font-light">{formattedDate}</p>
            </div>
          </div>
          <div className="text-4xl flex-shrink-0 animate-bounce">🎙️</div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <p className="text-gray-700 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
          {sermon.description}
        </p>

        <a
          href={sermon.downloadUrl}
          download={sermon.fileName}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition font-semibold group"
        >
          <span className="group-hover:scale-125 transition-transform">⬇️</span>
          Download Presentation
        </a>
      </div>
    </div>
  );
}
