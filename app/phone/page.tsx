'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendCode } from '@/lib/api';

export default function PhonePage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 11) return alert('شماره موبایل نامعتبر است');
    
    setLoading(true);
    try {
      const username = localStorage.getItem('username') || '';
      await sendCode(username, phone);
      localStorage.setItem('phone', phone);
      router.push('/verify');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-[380px] mx-auto flex flex-col relative px-5 py-8 justify-center">
      <h2 className="text-lg font-bold mb-2 text-center text-white">شماره موبایل خود را وارد کنید</h2>
      <p className="text-gray-400 text-xs mb-8 text-center leading-relaxed">برای ورود به بلوبانک، شماره تلفن همراه خود را وارد کنید.</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="bg-[#252834] rounded-2xl p-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // فقط عدد
            className="w-full bg-transparent text-white text-center text-lg tracking-widest font-medium placeholder-gray-500 focus:outline-none"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            maxLength={11}
            required
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading || phone.length < 11}
          className="w-full bg-[#6A9CFF] text-[#1C1E26] font-bold py-3.5 rounded-xl text-sm disabled:opacity-50 transition active:scale-95"
        >
          {loading ? 'در حال ارسال...' : 'دریافت کد تأیید'}
        </button>
      </form>
    </div>
  );
}