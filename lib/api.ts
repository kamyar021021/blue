const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'خطا در ورود');
  return res.json();
}

export async function sendCode(username: string, phoneNumber: string) {
  const res = await fetch(`${API_URL}/auth/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, phoneNumber }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'خطا در ارسال کد');
  return res.json();
}

export async function verify(username: string, code: string) {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, code }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'کد نامعتبر است');
  return res.json();
}