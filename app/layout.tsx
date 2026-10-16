import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Café Colonial - Reserve sua experiência",
  description: "Reserve sua experiência no Café Colonial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
