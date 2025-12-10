"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * EducationTimeline Component
 * Horizontal scroll with animated timeline bar
 * Shows diploma, year, and school with background images
 */
export default function EducationTimeline() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

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

            // Animate timeline bar fill
            gsap.fromTo(
                timelineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${scrollWidth}`,
                        scrub: 1,
                    },
                }
            );

            // Parallax on background images
            gsap.to(".education-bg-image", {
                x: -150,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                },
            });

            // Scale animation on degrees
            gsap.to(".education-degree", {
                scale: 0.98,
                opacity: 0.8,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                },
            });
        },
        { scope: containerRef, dependencies: [education] }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-light-surface dark:bg-dark-surface"
        >
            {/* Section title */}
            <div className="absolute top-12 left-8 md:left-16 z-20">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-glow">
                    Education
                </h2>
                <p className="mt-2 text-foreground/60">
                    
                </p>
            </div>

            {/* Timeline bar */}
            <div className="absolute top-32 left-8 md:left-16 right-8 md:right-16 z-20">
                {/* Background line */}
                <div className="relative h-1 bg-light-border dark:bg-dark-border/50 rounded-full">
                    {/* Animated fill */}
                    <div
                        ref={timelineRef}
                        className="absolute inset-y-0 left-0 w-full h-full bg-gradient-to-r from-primary via-primary-light to-primary rounded-full origin-left shadow-lg shadow-primary/50"
                        style={{ transformOrigin: "left center" }}
                    />
                </div>

                {/* Timeline nodes */}
                <div className="relative flex justify-between mt-2">
                    {education.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
                            <span className="text-xs md:text-sm text-primary font-semibold whitespace-nowrap">
                                {item.year}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Horizontal scroll container */}
            <div
                ref={scrollContainerRef}
                className="flex items-center h-screen gap-8 px-8 md:px-16"
            >
                {education.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw]",
                            "relative group"
                        )}
                    >
                        {/* Education card */}
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-2xl",
                                "h-[70vh] md:h-[75vh]",
                                "hover-glow"
                            )}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <div className="education-bg-image absolute inset-0 w-full h-full">
                                    <Image
                                        src={item.image}
                                        alt={item.school}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-light-bg/90 via-light-bg/80 to-light-bg/70 dark:from-dark-bg/90 dark:via-dark-bg/80 dark:to-dark-bg/70" />
                                {/* Accent gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-20" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                                {/* Year badge */}
                                <div className="flex items-center gap-2 mb-6 glass-card px-4 py-2 rounded-full w-fit">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="text-primary font-semibold">
                                        {item.year}
                                    </span>
                                </div>

                                {/* Degree */}
                                <h3
                                    className={cn(
                                        "education-degree",
                                        "text-3xl md:text-4xl lg:text-5xl",
                                        "font-display font-bold",
                                        "gradient-text",
                                        "mb-6"
                                    )}
                                >
                                    {item.degree}
                                </h3>

                                {/* School */}
                                <div className="flex items-center gap-3 mb-6">
                                    <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    <h4 className="text-2xl md:text-3xl font-bold text-foreground">
                                        {item.school}
                                    </h4>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-foreground/70 mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span>{item.location}</span>
                                </div>

                                {/* Description */}
                                <p className="text-foreground/80 text-base md:text-lg max-w-2xl leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Decorative element */}
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-tl-full blur-3xl -z-10" />
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
