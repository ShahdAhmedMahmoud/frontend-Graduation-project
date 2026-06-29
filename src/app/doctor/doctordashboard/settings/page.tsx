"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfessorSettingsPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    notifications: false,
    darkMode: false,
    language: "en",
  });

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === "ar" ? "rtl" : "ltr";
  }, [settings.language]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSettings(true);
    }
  }, [status]);

  const fetchSettings = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await fetch("http://localhost:5000/api/professors/me", {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      const result = await response.json();
      if (result.success && result.data?.preferences) {
        setSettings({
          notifications: result.data.preferences.notifications ?? false,
          darkMode: result.data.preferences.darkMode ?? false,
          language: result.data.preferences.language ?? "en",
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/professors/me/preferences",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify(settings),
        }
      );
      const result = await response.json();
      if (result.success) {
        await fetchSettings(false);
        alert("Settings updated successfully");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      alert("Failed to update settings");
    }
  };

  const logout = async () => {
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: "/login" });
  };

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-8 dark:text-white">Settings</h1>

        {/* Notifications */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-5 py-4 mb-4">
          <span className="font-medium dark:text-white">Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-5 py-4 mb-4">
          <span className="font-medium dark:text-white">Dark Mode</span>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>

        {/* Language */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-5 py-4 mb-6">
          <span className="font-medium dark:text-white">Language</span>
          <select
            value={settings.language}
            onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
            className="border rounded px-3 py-2 dark:bg-gray-600 dark:text-white dark:border-gray-500"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={savePreferences}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={logout}
            className="bg-red-100 text-red-600 px-6 py-2 rounded-lg hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}