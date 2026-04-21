import AnnouncementCard from "./AnnouncementCard";
import type { Announcement } from "@/lib/queries";

export default function AnnouncementsSection({
  announcements,
}: {
  announcements: Announcement[];
}) {
  return (
    <section id="announcements" className="mb-16 md:mb-20">
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tight">
          Latest Announcements
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </section>
  );
}