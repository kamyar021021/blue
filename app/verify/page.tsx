'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { verify } from '@/lib/api';

export default function VerifyPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [phone, setPhone] = useState('');
  // این Ref جلوی ارسال همزمان (Double Submit) را می‌گیرد
  const isSubmitting = useRef(false);

  useEffect(() => {
    const storedPhone = localStorage.getItem('phone') || '۰۹۱۲۳۴۵۶۷۸۹';
    const masked = storedPhone.length === 11 
      ? storedPhone.slice(0, 4) + '***' + storedPhone.slice(7) 
      : storedPhone;
    setPhone(masked);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // اگر کاربر عدد وارد کرد، خودکار برو به خانه بعدی
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // اگر بک‌اسپیس زد و خانه خالی بود، برو به خانه قبلی
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ۱. تعریف تابع ارسال قبل از useEffect (برای جلوگیری از خطای هوisting و حلقه)
  const handleSubmit = useCallback(async (fullCode: string) => {
    if (isSubmitting.current) return; // اگر در حال ارسال است، دوباره ارسال نکن
    isSubmitting.current = true;

    try {
      const username = localStorage.getItem('username') || '';
      await verify(username, fullCode);
      alert('ورود موفقیت‌آمیز بود!');
      router.push('/'); 
    } catch (error: any) {
      alert(error.message || 'کد نامعتبر است');
      // در صورت خطا، کدها را پاک می‌کنیم و فوکوس را برمی‌گردانیم
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      isSubmitting.current = false; // آزاد کردن قفل ارسال
    }
  }, [router]);

  // ۲. نظارت بر تغییرات کد و ارسال خودکار
  useEffect(() => {
    const fullCode = code.join('');
    // اگر کد ۶ رقم بود و در حال ارسال نبودیم، ارسال کن
    if (fullCode.length === 6 && !isSubmitting.current) {
      handleSubmit(fullCode);
    }
  }, [code, handleSubmit]);

  return (
    <div className="w-full h-full max-w-[380px] mx-auto flex flex-col relative px-5 py-8">
      
      {/* هدر بالا */}
      <div className="flex justify-between items-center w-full mt-2">
        <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 text-xs">
          ?
        </div>
        <h2 className="text-base font-bold text-white">تأیید دستگاه جدید</h2>
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* بخش وسط */}
      <div className="flex-1 flex flex-col justify-center w-full mt-4">
        <p className="text-center text-xs text-gray-300 mb-6">
          کد تایید ارسال شده به <span className="font-bold text-white">{phone}</span> را وارد کنید
        </p>

        {/* اینپوت‌های کد */}
        <div className="flex justify-between w-full gap-2 mb-6" dir="ltr">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={isSubmitting.current}
              ref={(el) => { inputs.current[index] = el; }}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="flex-1 min-w-0 aspect-[3/4] max-w-[46px] bg-[#252834] rounded-lg text-center text-xl text-white focus:ring-2 focus:ring-[#6A9CFF] transition-all focus:outline-none disabled:opacity-50"
            />
          ))}
        </div>

        <p 
          className="text-center text-[#6A9CFF] text-xs cursor-pointer hover:underline" 
          onClick={() => router.push('/phone')}
        >
          تغییر شماره تلفن همراه
        </p>
      </div>

      {/* دکمه بازگشت */}
      <button 
        onClick={() => router.back()} 
        className="absolute bottom-8 left-5 w-10 h-10 rounded-full bg-[#3A3D4A] flex items-center justify-center text-white active:scale-90 transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

    </div>
  );
}