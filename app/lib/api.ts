import { auth } from "../auth";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || "http://localhost:3000";

export async function fetchWithAuth<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {

  const session = await auth();

  if (!session?.user?.accessToken || session.error === 'RefreshAccessTokenError') {
    redirect('/login');
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.user.accessToken}`,
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (res.status === 401) redirect('/login');

  if (!res.ok) throw new Error(`Error fetching ${endpoint}: ${res.statusText}`);

  return res.json();
}

export async function clientFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Error fetching ${endpoint}: ${error.message || res.statusText}`);
  }

  return res.json();
}