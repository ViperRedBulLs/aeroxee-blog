import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "aeroxee",
  description: "Aeroxee is a website to use for make a free article.",
  authors: {
    name: "aeroxee",
    url: "https://github.com/aeroxee",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader height={5} showSpinner={false} zIndex={10000} />
          <Navbar />
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
