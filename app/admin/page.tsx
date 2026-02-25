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
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Restricted area — please log in.</p>

      {isAuth ? <AdminPanel /> : <AdminLoginForm />}
    </PageWrapper>
  );
}
