"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { cn } from "@/lib/cn";
import { Download, Mail } from "lucide-react";

/**
 * HeroSection Component - Minimalist
 * Clean landing section with simple fade-in animations
 */
export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Simple fade-in animation
            gsap.from(".hero-element", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-20"
        >
            {/* Content */}
            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
                <div className="hero-element">
                    <h1 className="font-bold text-foreground leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        TCHAMDJA Luc Mazangui
                    </h1>
                </div>

                <div className="hero-element">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-muted font-medium">
                        Intelligence Artificielle & Data Science
                    </h2>
                </div>

                <div className="hero-element">
                    <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted leading-relaxed px-4">
                        Ingénieur passionné par l&apos;IA et la Data Science avec une solide expertise
                        en machine learning, analyse de données et développement full-stack
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="hero-element flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <a
                        href="#contact"
                        className={cn(
                            "inline-flex items-center gap-2",
                            "px-8 py-3 rounded-md",
                            "bg-primary text-white font-semibold",
                            "hover:opacity-90 hover:-translate-y-0.5",
                            "transition-all duration-200"
                        )}
                    >
                        <Mail className="w-5 h-5" />
                        <span>Me Contacter</span>
                    </a>
                    <a
                        href="/cv.pdf"
                        download
                        className={cn(
                            "inline-flex items-center gap-2",
                            "px-8 py-3 rounded-md",
                            "border border-border bg-surface text-foreground font-semibold",
                            "hover:border-primary",
                            "transition-all duration-200"
                        )}
                    >
                        <Download className="w-5 h-5" />
                        <span>Télécharger CV</span>
                    </a>
                </div>

                {/* Stats */}
                <div className="hero-element">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-4">
                        {[
                            { label: "Projets Réalisés", value: "20+" },
                            { label: "Technologies", value: "15+" },
                            { label: "Certifications", value: "4+" },
                            { label: "Années d'Expérience", value: "3+" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="minimal-card text-center p-4 sm:p-6"
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] sm:text-xs md:text-sm text-muted uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Minimal scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-foreground rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
