"use client";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationTimeline from "@/components/sections/EducationTimeline";
import SkillsMindMap from "@/components/sections/SkillsMindMap";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import GitHubRepos from "@/components/sections/GitHubRepos";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

/**
 * Home Page - Minimalist Portfolio Layout
 * Clean, content-focused design with subtle animations
 */
export default function Home() {
    return (
        <>
            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="relative bg-light-bg dark:bg-dark-bg">
                <HeroSection />
                <ProjectsSection />
                <GitHubRepos username="tchluc" />
                <EducationTimeline />
                <SkillsMindMap />
                <CertificationsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
