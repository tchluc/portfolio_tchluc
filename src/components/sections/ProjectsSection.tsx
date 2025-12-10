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
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-dark-surface"
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
                                "glass-card p-6 md:p-8 rounded-2xl",
                                "hover-glow",
                                "overflow-hidden"
                            )}
                        >
                            {/* Project image */}
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-dark-bg">
                                <div className="project-image absolute inset-0 flex items-center justify-center text-primary/20 text-6xl">
                                    #{index + 1}
                                </div>
                            </div>

                            {/* Project info */}
                            <div className="space-y-4">
                                <h3 className="project-title text-2xl md:text-3xl font-display font-bold gradient-text">
                                    {project.title}
                                </h3>

                                <p className="text-foreground/70 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
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
                                            "inline-flex items-center gap-2",
                                            "text-primary hover:text-primary-light",
                                            "transition-colors duration-300",
                                            "group/link"
                                        )}
                                    >
                                        <span>View Project</span>
                                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
