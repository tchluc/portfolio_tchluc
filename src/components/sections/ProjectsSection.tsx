"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectsSection Component
 * Horizontal scroll gallery with parallax effects
 * Triggered by vertical scroll using GSAP ScrollTrigger
 */
export default function ProjectsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            // Calculate total scroll width
            const scrollWidth = container.scrollWidth - window.innerWidth;

            // Horizontal scroll animation
            gsap.to(container, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Parallax on images - slower than cards
            gsap.to(".project-image", {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                },
            });

            // Scale animation on titles
            gsap.to(".project-title", {
                scale: 0.95,
                opacity: 0.7,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                },
            });
        },
        { scope: containerRef, dependencies: [projects] }
    );

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-light-surface dark:bg-dark-surface"
        >
            {/* Section title */}
            <div className="absolute top-12 left-8 md:left-16 z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-glow">
                    Featured Projects
                </h2>
                <p className="mt-2 text-foreground/60">
                    Scroll horizontally to explore
                </p>
            </div>

            {/* Horizontal scroll container */}
            <div
                ref={scrollContainerRef}
                className="flex items-center h-screen gap-8 px-8 md:px-16"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={cn(
                            "flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw]",
                            "relative group"
                        )}
                    >
                        {/* Project card */}
                        <div
                            className={cn(
                                "modern-card",
                                "hover-glow",
                                "overflow-hidden",
                                "border-2 border-transparent hover:border-primary/30",
                                "gpu-accelerated"
                            )}
                        >
                            {/* Project image */}
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-500">
                                <div className="project-image absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl md:text-8xl font-bold text-primary/30 mb-2">
                                            #{index + 1}
                                        </div>
                                        <div className="text-sm text-foreground/40 uppercase tracking-wider">
                                            Projet
                                        </div>
                                    </div>
                                </div>
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Project info */}
                            <div className="space-y-4">
                                <h3 className="project-title text-2xl md:text-3xl font-display font-bold gradient-text">
                                    {project.title}
                                </h3>

                                <p className="text-foreground/70 line-clamp-3 text-base md:text-lg leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Link */}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "inline-flex items-center gap-2 mt-4",
                                            "px-6 py-3 rounded-full",
                                            "bg-primary/10 hover:bg-primary text-foreground hover:text-white",
                                            "border border-primary/30 hover:border-primary",
                                            "transition-all duration-300",
                                            "group/link font-medium"
                                        )}
                                    >
                                        <span>Voir le Projet</span>
                                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* End spacer */}
                <div className="flex-shrink-0 w-8" />
            </div>
        </section>
    );
}
