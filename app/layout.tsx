import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "משחקים לילדים - Kids Games",
  description: "משחקים חינוכיים לילדים - Educational games for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
