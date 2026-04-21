"use client";

import { useState, useEffect } from "react";

interface ContactInfo {
  id: number;
  address_line_1: string;
  address_line_2: string;
  map_url: string;
  phone: string;
  email: string;
  prayer_request_form_url: string;
}

export default function ContactInfoManager() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    address_line_1: "",
    address_line_2: "",
    map_url: "",
    phone: "",
    email: "",
    prayer_request_form_url: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("/api/contact-info");
      const data = await response.json();
      if (data) {
        setContactInfo(data);
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
      alert("Failed to fetch contact info");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save contact info");

      fetchContactInfo();
      alert("Contact info updated successfully!");
    } catch (error) {
      console.error("Error saving contact info:", error);
      alert("Failed to save contact info");
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (!contactInfo) {
    return <div className="text-center py-4">No contact info found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            value={formData.address_line_1}
            onChange={(e) =>
              setFormData({ ...formData, address_line_1: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            value={formData.address_line_2}
            onChange={(e) =>
              setFormData({ ...formData, address_line_2: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Map URL</label>
          <input
            type="url"
            value={formData.map_url}
            onChange={(e) =>
              setFormData({ ...formData, map_url: e.target.value })
            }
            placeholder="https://maps.app.goo.gl/..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Prayer Request Form URL
          </label>
          <input
            type="url"
            value={formData.prayer_request_form_url}
            onChange={(e) =>
              setFormData({
                ...formData,
                prayer_request_form_url: e.target.value,
              })
            }
            placeholder="https://docs.google.com/forms/..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Save Contact Info
        </button>
      </form>
    </div>
  );
}
