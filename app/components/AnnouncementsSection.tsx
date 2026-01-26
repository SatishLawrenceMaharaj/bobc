import AnnouncementCard from "./AnnouncementCard";
import { announcements } from "../data/announcements";

export default function AnnouncementsSection() {
  return (
    <section id="announcements" className="mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Latest Announcements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </section>
  );
}
