import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tu Nombre — Portafolio creativo",
  description:
    "Diseño digital, dirección visual y desarrollo creativo en una experiencia 3D interactiva.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
