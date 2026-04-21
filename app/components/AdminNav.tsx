"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNav() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg border-b-4 border-orange-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">BOBC Admin Panel</h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="hover:bg-blue-700 px-6 py-2 rounded-lg transition font-semibold"
          >
            Back to Home
          </Link>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}
