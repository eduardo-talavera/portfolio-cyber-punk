import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edgar Talavera — Software, AI & SRE Engineer",
  description:
    "Portfolio of Edgar Talavera, software engineer focused on scalable products, applied AI and reliable cloud systems.",
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "SRE",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
  ],
  openGraph: {
    title: "Edgar Talavera — Software, AI & SRE Engineer",
    description:
      "Scalable software, applied AI and reliable cloud systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
