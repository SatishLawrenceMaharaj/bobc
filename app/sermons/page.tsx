"use client";

import Header from "../components/Header";
import SermonGallery from "../components/SermonGallery";
import Footer from "../components/Footer";

export default function SermonsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sermon Presentations</h1>
          <p className="text-lg text-gray-600">
            Download PowerPoint presentations from our Sunday services and ministry events
          </p>
        </div>
        <SermonGallery />
      </main>
      <Footer />
    </div>
  );
}
