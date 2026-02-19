"use client";
import { useEffect, useState } from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminPanel from '../components/AdminPanel';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const cookieHeader = typeof document !== 'undefined' ? document.cookie : '';
    const match = cookieHeader.split(';').map(s => s.trim()).find(s => s.startsWith('tcat_admin='));
    const cookieAuth = !!match && match.split('=')[1] === '1';
    const localAuth = typeof localStorage !== 'undefined' ? localStorage.getItem('tcat_admin_public') === '1' : false;
    setIsAuth(cookieAuth || localAuth);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-zinc-50">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Restricted area — please log in.</p>

        {isAuth ? <AdminPanel /> : <AdminLoginForm />}
      </div>
    </div>
  );
}
