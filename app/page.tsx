import Header from "./components/Header";
import AnnouncementsSection from "./components/AnnouncementsSection";
import ServiceTimes from "./components/ServiceTimes";
import Footer from "./components/Footer";
import {
  getAnnouncements,
  getContactInfo,
  getServiceTimes,
} from "@/lib/queries";

export default async function Home() {
  const [announcements, serviceTimes, contactInfo] = await Promise.all([
    getAnnouncements(),
    getServiceTimes(),
    getContactInfo(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <AnnouncementsSection announcements={announcements} />
        <ServiceTimes
          serviceTimes={serviceTimes}
          contactInfo={contactInfo}
        />
      </main>
      <Footer />
    </div>
  );
}