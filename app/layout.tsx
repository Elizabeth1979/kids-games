import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Configure fonts with optimal settings
export const fredoka = Fredoka({
  subsets: ["latin", "hebrew"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "משחקים לילדים - Kids Games",
  description: "משחקים חינוכיים לילדים - Educational games for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="kids-games-theme">
      {children}
    </ThemeProvider>
  );
}
