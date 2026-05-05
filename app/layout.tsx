import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Tracker", // עדכנתי לך גם את הכותרת שתיראה מקצועית בגוגל
  description: "Real-time crypto prices and tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900">
        {" "}
        {/* הוספתי רקע כהה שיתאים לעיצוב */}
        <Header />{" "}
        {/* 2. כאן ה-Header נכנס! הוא יהיה מעל כל דף שיעלה בתוך ה-children */}
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
