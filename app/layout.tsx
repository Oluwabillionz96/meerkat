import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meerkat",
  description: " Browse the funniest Meerkat memes on the internet!",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 h-[100vh] p-4 relative`}
      >
        <header className="flex flex-col items-center justify-center text-center mb-8 ">
          <div className="flex justify-center items-center">
            <Image
              src={"/logo.png"}
              width={90}
              height={50}
              alt="logo"
              className="flex-1"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-left ">
              Meerkat meme Gallery
            </h1>
          </div>
          <p className="text-gray-600 text-xl">
            Browse the funniest Meerkat memes on the internet!
          </p>
        </header>
        {children}
        <footer className="text-center mb-4">
          Built with ❤️ by{" "}
          <Link href={"https://x.com/gudluck_reuben"} target="_blanck">
            Goodluck Reuben
          </Link>
        </footer>
      </body>
    </html>
  );
}
