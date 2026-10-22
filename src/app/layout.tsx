import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@wrksz/themes/next";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jenna Neifert",
  description: "Software Engineer with focus on friendly UIs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
