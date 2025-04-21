"use client";

import { ChartThemeProvider } from "@/providers/chart-theme-provider";
import { ModeThemeProvider } from "@/providers/mode-theme-provider";



export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModeThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ChartThemeProvider>{children}</ChartThemeProvider>
    </ModeThemeProvider>
  );
}
