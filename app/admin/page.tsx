import AnnouncementManager from "./components/AnnouncementManager";
import ServiceTimesManager from "./components/ServiceTimesManager";
import ContactInfoManager from "./components/ContactInfoManager";
import YouTubeScrapeManager from "./components/YouTubeScrapeManager";
import AdminGuard from "../components/AdminGuard";
import AdminNav from "../components/AdminNav";

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminNav />

        <main className="max-w-7xl mx-auto px-4 py-12">
          <AnnouncementManager />
          <ServiceTimesManager />
          <ContactInfoManager />
          <YouTubeScrapeManager />
        </main>
      </div>
    </AdminGuard>
  );
}
