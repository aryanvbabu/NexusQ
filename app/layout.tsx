import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NexusQ Global — Digital Product Ecosystem",
    template: "%s | NexusQ Global",
  },
  description:
    "NexusQ Global builds a digital product ecosystem. AuditionQ is our live flagship product; other platforms are presented honestly as vision or exploration.",
  openGraph: {
    title: "NexusQ Global — Digital Product Ecosystem",
    description:
      "Parent company behind AuditionQ and a growing set of digital products — live and vision.",
    type: "website",
    siteName: "NexusQ Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusQ Global",
    description:
      "Building a serious digital product ecosystem — with AuditionQ live today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nq-bg text-nq-text">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
