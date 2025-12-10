"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { cn } from "@/lib/cn";

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
                    },
                    "-=0.3"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex items-center justify-center min-h-screen px-4 md:px-8"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg -z-10" />

            {/* Animated circle */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />

            {/* Content */}
            <div className="max-w-5xl mx-auto text-center space-y-8">
                <div className="overflow-hidden">
                    <h1 className="hero-title font-display font-bold gradient-text">
                        TCHAMDJA Luc Mazangui
                    </h1>
                </div>

                <div className="overflow-hidden">
                    <h2 className="hero-title text-2xl md:text-4xl text-foreground/80">
                        Intelligence Artificielle and Data Science
                    </h2>
                </div>

                <div className="overflow-hidden">
                    <p className="hero-subtitle max-w-2xl mx-auto text-foreground/60">
                        I am a passionate AI and Data Science engineer with a strong
                        background in machine learning and data analysis.
                    </p>
                </div>

                <div className="hero-cta pt-8">
                    <button
                        className={cn(
                            "px-8 py-4 rounded-full",
                            "bg-primary text-dark-bg font-semibold text-lg",
                            "hover-glow",
                            "transition-all duration-300"
                        )}
                    >
                        Contact Me
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
