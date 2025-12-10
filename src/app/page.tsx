"use client";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationTimeline from "@/components/sections/EducationTimeline";
import SkillsMindMap from "@/components/sections/SkillsMindMap";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";

/**
 * Home Page - Portfolio One-Page Layout
 * Immersive scrollytelling experience with GSAP animations
 */
export default function Home() {
    return (
        <>
            <MouseFollower />
            <main className="relative bg-dark-bg">
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
