'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(username.trim(), password.trim());
      localStorage.setItem('username', username.trim());
      router.push('/phone');
    } catch (error: any) {
      alert(error.message || 'خطا در ورود');
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-[380px] mx-auto flex flex-col relative px-5 py-8">
      <div className="absolute top-8 left-5 w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 text-xs">
        ?
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="mb-10">
          <h1 className="text-[64px] font-bold tracking-tight text-white leading-none" style={{ fontFamily: 'sans-serif' }}>blu</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="bg-[#252834] rounded-2xl p-4 flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-white text-sm font-medium placeholder-gray-500 focus:outline-none"
              placeholder="نام کاربری (kamyiey)"
              required
              suppressHydrationWarning={true} // 👈 این خط اضافه شد
            />
            <div className="h-[1px] w-full bg-gray-700/50"></div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white text-sm font-medium placeholder-gray-500 focus:outline-none"
              placeholder="رمز عبور"
              required
              suppressHydrationWarning={true} // 👈 این خط اضافه شد
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6A9CFF] text-[#1C1E26] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition active:scale-95"
            suppressHydrationWarning={true} // 👈 این خط اضافه شد
          >
            {loading ? 'در حال ورود...' : 'ورود با اثر انگشت'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.123.24-2.191.668-3.157m1.714 8.99c-.32.702-.686 1.381-1.097 2.032m4.11-2.84a11.953 11.953 0 01-1.002 5.5m-1.39-7.404a7.5 7.5 0 00-1.203 4.198" />
            </svg>
          </button>
        </form>

        <p className="mt-5 text-[#6A9CFF] text-xs font-medium cursor-pointer">نمی‌توانید وارد شوید؟</p>
      </div>

      <p className="text-center text-gray-500 text-[10px] mt-auto pt-4">Version 3.11.0</p>
    </div>
  );
}