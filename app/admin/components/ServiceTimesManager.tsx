"use client";

import { useState, useEffect } from "react";

interface ServiceTime {
  id: string;
  title: string;
  time_text: string;
  location: string;
}

export default function ServiceTimesManager() {
  const [serviceTimes, setServiceTimes] = useState<ServiceTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    time_text: "",
    location: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchServiceTimes();
  }, []);

  const fetchServiceTimes = async () => {
    try {
      const response = await fetch("/api/service-times");
      const data = await response.json();
      setServiceTimes(data);
    } catch (error) {
      console.error("Error fetching service times:", error);
      alert("Failed to fetch service times");
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

      const response = await fetch("/api/service-times", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save service time");

      setFormData({ title: "", time_text: "", location: "" });
      setEditingId(null);
      fetchServiceTimes();
    } catch (error) {
      console.error("Error saving service time:", error);
      alert("Failed to save service time");
    }
  };

  const handleEdit = (st: ServiceTime) => {
    setFormData({
      title: st.title,
      time_text: st.time_text,
      location: st.location,
    });
    setEditingId(st.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/service-times?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete service time");

      fetchServiceTimes();
    } catch (error) {
      console.error("Error deleting service time:", error);
      alert("Failed to delete service time");
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Service Times</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Sunday Service"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Time</label>
          <input
            type="text"
            value={formData.time_text}
            onChange={(e) =>
              setFormData({ ...formData, time_text: e.target.value })
            }
            placeholder="e.g., 8:00 AM - 10:00 AM every Sunday"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="e.g., Main Sanctuary"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Service Time
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ title: "", time_text: "", location: "" });
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {serviceTimes.map((st) => (
          <div key={st.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{st.title}</h3>
            <p className="text-gray-700 mb-1">
              <strong>Time:</strong> {st.time_text}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Location:</strong> {st.location || "Not specified"}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(st)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(st.id)}
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
