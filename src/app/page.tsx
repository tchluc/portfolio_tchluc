"use client";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationTimeline from "@/components/sections/EducationTimeline";
import SkillsMindMap from "@/components/sections/SkillsMindMap";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";

/**
 * Home Page - Portfolio One-Page Layout
 * Immersive scrollytelling experience with GSAP animations
 * Features: particles, mouse tracking, smooth scroll, glassmorphism
 */
export default function Home() {
    return (
        <>
            {/* Background effects */}
            <ParticleBackground />
            <MouseFollower />

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="relative bg-light-bg dark:bg-dark-bg">
                <HeroSection />
                <ProjectsSection />
                <EducationTimeline />
                <SkillsMindMap />
                <CertificationsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}

