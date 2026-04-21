import AnnouncementManager from "./components/AnnouncementManager";
import ServiceTimesManager from "./components/ServiceTimesManager";
import ContactInfoManager from "./components/ContactInfoManager";
import YouTubeScrapeManager from "./components/YouTubeScrapeManager";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">BOBC Admin Panel</h1>
          <div className="flex gap-4">
            <Link href="/" className="hover:bg-blue-700 px-6 py-2 rounded-lg transition font-semibold">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnnouncementManager />
        <ServiceTimesManager />
        <ContactInfoManager />
        <YouTubeScrapeManager />
      </main>
    </div>
  );
}
