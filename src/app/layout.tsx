import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import { Providers } from "@/components/Providers";

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
    default: "TsungYu Chan | Personal Blog",
    template: "%s | TsungYu Chan",
  },
  description: "TsungYu Chan's personal blog about web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <Providers>
          <div className="max-w-[1440px] mx-auto min-h-screen flex">

            <aside className="hidden md:block w-64 border-r sticky top-0 h-screen">
              <div className="h-full flex flex-col">
                <LeftSidebar />
              </div>
            </aside>

            <div className="flex-grow flex flex-col min-w-0">
              <MobileNav />

              <main className="flex-grow min-w-0 py-10">
                {children}
              </main>

              <Footer />
            </div>

          </div>
        </Providers>
      </body>
    </html>
  );
}
