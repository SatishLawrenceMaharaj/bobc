import type { Announcement } from "@/lib/queries";

export default function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement;
}) {
  const priorityColors: Record<"high" | "medium" | "low", string> = {
    high: "border-l-4 border-red-500 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200",
    medium: "border-l-4 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200",
    low: "border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200",
  };

  const priorityIcons: Record<"high" | "medium" | "low", string> = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };

  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-xl p-6 hover:scale-105 transform ${priorityColors[announcement.priority]}`}
    >
      <div className="flex justify-between items-start mb-3 gap-3">
        <h3 className="text-2xl font-bold text-gray-900 flex-1">
          {announcement.title}
        </h3>
        <span className="text-2xl flex-shrink-0">{priorityIcons[announcement.priority]}</span>
      </div>
      <p className="text-sm font-medium text-gray-600 mb-4">📅 {announcement.date}</p>
      <p className="text-gray-700 leading-relaxed line-clamp-3">{announcement.content}</p>
    </div>
  );
}