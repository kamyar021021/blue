import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // این خط به Next.js می‌گوید که فقط به پوشه front نگاه کند
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;