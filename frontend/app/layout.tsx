import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Canastas Verdes",
  description: "Canastas Verdes - Venta de frutas y verduras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.className} bg-gray-200`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
