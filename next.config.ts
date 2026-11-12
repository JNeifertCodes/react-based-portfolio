import type { NextConfig } from "next";

// The Vercel Toolbar (comments/feedback) is injected on preview deployments only.
const isPreview = process.env.VERCEL_ENV === "preview";
const isDev = process.env.NODE_ENV === "development";
const toolbar = (...sources: string[]) =>
  isPreview ? ` ${sources.join(" ")}` : "";

const csp = [
  "default-src 'self'",
  // The theme script from @wrksz/themes and Next's prerender data are inline scripts.
  // A nonce would force dynamic rendering, so a static site uses 'unsafe-inline'.
  // Dev only: React uses eval() to rebuild callstacks, and Vercel Analytics
  // loads its debug script from va.vercel-scripts.com (production uses /_vercel/insights).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}${toolbar("https://vercel.live")}`,
  `style-src 'self' 'unsafe-inline'${toolbar("https://vercel.live")}`,
  `img-src 'self' data:${toolbar("https://vercel.live", "https://vercel.com", "blob:")}`,
  `font-src 'self'${toolbar("https://vercel.live", "https://assets.vercel.com")}`,
  // Vercel Analytics posts to /_vercel/insights (same origin)
  `connect-src 'self'${toolbar("https://vercel.live", "wss://ws-us3.pusher.com")}`,
  ...(isPreview ? ["frame-src https://vercel.live"] : []),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
