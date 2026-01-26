"use client";

import Header from "../components/Header";
import VideoGallery from "../components/VideoGallery";
import Footer from "../components/Footer";

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Church Videos</h1>
          <p className="text-lg text-gray-600">
            Watch our latest sermons and ministry moments from Bethel Open Bible Church
          </p>
        </div>
        <VideoGallery />
      </main>
      <Footer />
    </div>
  );
}
