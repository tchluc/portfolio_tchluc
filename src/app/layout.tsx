import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";

// Google Fonts configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Immersive portfolio showcasing cutting-edge web development with GSAP, Next.js, and WebGL. Experience award-winning design and scrollytelling.",
  keywords: ["portfolio", "web developer", "GSAP", "Next.js", "creative developer", "scrollytelling"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio | Creative Developer",
    description: "Award-winning immersive portfolio with advanced scrollytelling",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <SmoothScroll>
          <ScrollProgress />
          <ThemeToggle />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

