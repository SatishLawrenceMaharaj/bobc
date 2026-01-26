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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{sermon.title}</h3>
            <p className="text-sm text-blue-100 mb-2">{sermon.speaker}</p>
            <p className="text-sm text-blue-100">{formattedDate}</p>
          </div>
          <div className="text-4xl flex-shrink-0">📊</div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-700 text-sm mb-6 flex-1 line-clamp-3">
          {sermon.description}
        </p>

        <a
          href={sermon.downloadUrl}
          download={sermon.fileName}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          <span>⬇️</span>
          Download Presentation
        </a>
      </div>
    </div>
  );
}
