"use client";

import Header from "../components/Header";
import SermonGallery from "../components/SermonGallery";
import Footer from "../components/Footer";

export default function SermonsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-16 md:mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">Sermon Presentations</h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Download PowerPoint presentations from our Sunday services and ministry events
          </p>
        </div>
        <SermonGallery />
      </main>
      <Footer />
    </div>
  );
}
