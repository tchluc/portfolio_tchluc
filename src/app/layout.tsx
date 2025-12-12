import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";

// Google Fonts configuration - Premium Typography
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luc Tchamdja | Ingénieur IA & Data Science",
  description: "Portfolio professionnel de Luc Tchamdja, Ingénieur en Intelligence Artificielle et Data Science. Expertise en Machine Learning, Deep Learning, développement full-stack et analyse de données.",
  keywords: [
    "Intelligence Artificielle",
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Next.js",
    "Full-Stack Developer",
    "Portfolio",
    "Luc Tchamdja"
  ],
  authors: [{ name: "Luc Tchamdja" }],
  openGraph: {
    title: "Luc Tchamdja | Ingénieur IA & Data Science",
    description: "Portfolio professionnel - Expertise en IA, Data Science et développement full-stack",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luc Tchamdja | Ingénieur IA & Data Science",
    description: "Portfolio professionnel - Expertise en IA, Data Science et développement full-stack",
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
        className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased`}
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

