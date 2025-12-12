"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { cn } from "@/lib/cn";
import { Download, Mail, ArrowRight } from "lucide-react";

/**
 * HeroSection Component
 * Landing section with animated reveal and gradient text
 */
export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animated reveal sequence
            tl.from(".hero-title", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
            })
                .from(
                    ".hero-subtitle",
                    {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.5"
                )
                .from(
                    ".hero-cta",
                    {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-stats",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                    },
                    "-=0.2"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative flex items-center justify-center min-h-screen px-4 md:px-8 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg -z-10" />

            {/* Animated circles */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float gpu-accelerated" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float gpu-accelerated animate-delay-500" />

            {/* Content */}
            <div className="max-w-5xl mx-auto text-center space-y-8 z-20 relative">
                <div className="overflow-hidden">
                    <h1 className="hero-title font-display font-bold gradient-text leading-tight">
                        TCHAMDJA Luc Mazangui
                    </h1>
                </div>

                <div className="overflow-hidden">
                    <h2 className="hero-title text-2xl md:text-4xl text-foreground/80 font-semibold">
                        Intelligence Artificielle & Data Science
                    </h2>
                </div>

                <div className="overflow-hidden">
                    <p className="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 leading-relaxed">
                        Ingénieur passionné par l&apos;IA et la Data Science avec une solide expertise
                        en machine learning, analyse de données et développement full-stack
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <a
                        href="#contact"
                        className={cn(
                            "group inline-flex items-center gap-3",
                            "px-8 py-4 rounded-full",
                            "bg-primary text-white font-semibold text-lg",
                            "hover-glow pulse-border",
                            "transition-all duration-300",
                            "will-change-transform"
                        )}
                    >
                        <Mail className="w-5 h-5" />
                        <span>Me Contacter</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="/cv.pdf"
                        download
                        className={cn(
                            "group inline-flex items-center gap-3",
                            "px-8 py-4 rounded-full",
                            "glass-card text-foreground font-semibold text-lg",
                            "hover:bg-primary/10 hover:scale-105",
                            "transition-all duration-300",
                            "will-change-transform"
                        )}
                    >
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        <span>Télécharger CV</span>
                    </a>
                </div>

                {/* Stats/Highlights */}
                <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 max-w-4xl mx-auto">
                    {[
                        { label: "Projets Réalisés", value: "20+" },
                        { label: "Technologies", value: "15+" },
                        { label: "Certifications", value: "4+" },
                        { label: "Années d&apos;Expérience", value: "3+" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="glass-card p-4 md:p-6 rounded-2xl hover:scale-105 transition-transform duration-300 will-change-transform"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-foreground/60">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer">
                <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 hover:border-primary transition-colors">
                    <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
