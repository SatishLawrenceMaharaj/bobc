"use client";

import SermonCard from "./SermonCard";
import { sermons } from "../data/sermons";

interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string;
  description: string;
  fileName: string;
  downloadUrl: string;
}

export default function SermonGallery() {
  const sermonList: Sermon[] = sermons.length > 0 ? sermons : [];

  return (
    <div>
      {sermonList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No sermon presentations available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermonList.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      )}

      {/* Information Section */}
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">About Our Sermons</h3>
        <p className="text-gray-700 mb-4">
          Download PowerPoint presentations from our Sunday services and special ministry events. These presentations include the key teachings, scripture references, and discussion points from each sermon.
        </p>
        <p className="text-gray-700">
          If you have any questions about the content or would like to request a specific sermon, please feel free to contact us.
        </p>
      </div>
    </div>
  );
}
