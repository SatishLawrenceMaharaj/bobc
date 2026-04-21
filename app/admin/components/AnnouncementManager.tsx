"use client";

import { useState, useEffect } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  date: string;
}

export default function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "medium" as const,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      alert("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { ...formData, id: editingId }
        : formData;

      const response = await fetch("/api/announcements", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save announcement");

      setFormData({ title: "", content: "", priority: "medium" });
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
      alert("Failed to save announcement");
    }
  };

  const handleEdit = (ann: Announcement) => {
    setFormData({
      title: ann.title,
      content: ann.content,
      priority: ann.priority,
    });
    setEditingId(ann.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/announcements?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete announcement");

      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete announcement");
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as "high" | "medium" | "low",
              })
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Announcement
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ title: "", content: "", priority: "medium" });
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{ann.title}</h3>
              <span className={`px-2 py-1 rounded text-white text-sm ${
                ann.priority === "high"
                  ? "bg-red-500"
                  : ann.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}>
                {ann.priority}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{ann.content}</p>
            <p className="text-sm text-gray-500 mb-3">{ann.date}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(ann)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ann.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
