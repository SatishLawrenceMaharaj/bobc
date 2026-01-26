import Header from "./components/Header";
import AnnouncementsSection from "./components/AnnouncementsSection";
import ServiceTimes from "./components/ServiceTimes";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnnouncementsSection />
        <ServiceTimes />
      </main>
      <Footer />
    </div>
  );
}
