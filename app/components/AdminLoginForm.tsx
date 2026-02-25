"use client";
import { useState } from "react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const body = await res.json();
        setError(body?.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mt-4 space-y-2">
      <div>
        <label className="text-sm">Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex items-center gap-2">
        <button type="submit" disabled={loading} className="px-3 py-1 rounded bg-indigo-600 text-white">{loading ? 'Logging in...' : 'Log in'}</button>
      </div>
    </form>
  );
}
