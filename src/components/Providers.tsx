"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  // enableSystem=true => auto switch theme based on user's system preference
  // attribute="class" let Tailwind switch themes based on the presence of a "dark" class on the html element
  // defaultTheme="system" means the default theme will follow the system preference, but users can still toggle it manually
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
