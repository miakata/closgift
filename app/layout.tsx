import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Barriecito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clo's radio",
  
};
const barriecito = Barriecito({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
      <html lang="en" className={barriecito.className}>
         
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
