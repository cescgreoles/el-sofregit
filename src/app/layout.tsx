import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "El Sofregit",
  description: "La teva web de receptes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="absolute inset-0 -z-10">
          {/* Corregido para la nueva versión */}
          <Image
            src="/bg.png"
            alt="Background image"
            fill // Propiedad moderna en lugar de "layout"
            style={{ objectFit: "cover" }} // Usar estilo inline o clase CSS
            priority={true} // Para cargar la imagen de fondo con prioridad
          />
        </div>
        {children}
      </body>
    </html>
  );
}
