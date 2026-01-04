'use client'

import { useState } from "react";
import { signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await fetch(`${API_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }

    await signOut({ callbackUrl: "/login" });
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
} 