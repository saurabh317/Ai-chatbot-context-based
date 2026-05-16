import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClientProviderWrapper from "@/providers/QueryClientProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "AI Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <QueryClientProviderWrapper>
        <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
          <body className="min-h-full flex flex-col">
            {children}
            <ToastProvider />
          </body>
        </html>
      </QueryClientProviderWrapper>
    </ReduxProvider>
  );
}
