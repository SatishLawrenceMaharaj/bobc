import Image from "next/image";
import { useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
}

export default function VideoCard({ video }: { video: Video }) {
  const [imgSrc, setImgSrc] = useState(
    video.thumbnail || "/images/video-placeholder.jpg"
  );

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
    >
      <div className="relative bg-gray-200 h-48 overflow-hidden">
        <Image
          src={imgSrc}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:opacity-75 transition"
          onError={() => setImgSrc("/images/video-placeholder.jpg")}
        />
      </div>

      <div className="bg-white p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">📅 {video.date}</span>
          <span className="text-xs font-semibold text-blue-600 group-hover:underline">
            Watch →
          </span>
        </div>
      </div>
    </a>
  );
}