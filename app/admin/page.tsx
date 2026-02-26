"use client";
import { useEffect, useState } from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminPanel from '../components/AdminPanel';
import PageWrapper from '../components/PageWrapper';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const res = await fetch('/api/admin/session', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
        });

        if (!res.ok) {
          if (active) setIsAuth(false);
          return;
        }

        const body = await res.json();
        if (active) setIsAuth(body?.isAuth === true);
      } catch {
        if (active) setIsAuth(false);
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  return (
    <PageWrapper>
      <section className="space-y-6">
        <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Console</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Restricted area for attendance and ticket management.
          </p>
        </div>

        {isAuth ? <AdminPanel /> : <AdminLoginForm />}
      </section>
    </PageWrapper>
  );
}
