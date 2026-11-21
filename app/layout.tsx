import type { Metadata } from 'next';
import './globals.css'; // 👈 این خط نباید پاک شود

export const metadata: Metadata = {
  title: 'بلوبانک',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="h-[100dvh] w-full overflow-hidden bg-[#1C1E26] text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}