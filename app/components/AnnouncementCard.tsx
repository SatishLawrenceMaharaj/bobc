import { Announcement } from "../data/announcements";

export default function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement;
}) {
  const priorityColors = {
    high: "border-l-4 border-red-500 bg-red-50",
    medium: "border-l-4 border-yellow-500 bg-yellow-50",
    low: "border-l-4 border-green-500 bg-green-50",
  };

  const priorityBadgeColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  return (
    <div
      className={`rounded-lg shadow-md p-6 hover:shadow-lg transition ${priorityColors[announcement.priority]}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-bold text-gray-800">{announcement.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityBadgeColors[announcement.priority]}`}
        >
          {announcement.priority.charAt(0).toUpperCase() +
            announcement.priority.slice(1)}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">📅 {announcement.date}</p>
      <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
    </div>
  );
}
