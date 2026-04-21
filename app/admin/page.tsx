import AnnouncementManager from "./components/AnnouncementManager";
import ServiceTimesManager from "./components/ServiceTimesManager";
import ContactInfoManager from "./components/ContactInfoManager";
import YouTubeScrapeManager from "./components/YouTubeScrapeManager";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BOBC Admin Panel</h1>
          <div className="flex gap-4">
            <Link href="/" className="hover:bg-blue-800 px-4 py-2 rounded">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnnouncementManager />
        <ServiceTimesManager />
        <ContactInfoManager />
        <YouTubeScrapeManager />
      </main>
    </div>
  );
}
