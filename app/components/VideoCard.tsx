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
    video.thumbnail || "/public/video-placeholder.png"
  );

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all transform border border-gray-100"
    >
      <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 h-48 overflow-hidden">
        <Image
          src={imgSrc}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onError={() => setImgSrc("/public/video-placeholder.png")}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-orange-400 transition-all">
            <span className="text-2xl">▶️</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 group-hover:bg-gradient-to-br from-blue-50 to-white transition">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-medium">📅 {video.date}</span>
          <span className="text-xs font-semibold text-blue-600 group-hover:text-orange-500 transition">
            Watch →
          </span>
        </div>
      </div>
    </a>
  );
}