"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { Code, Database, Palette, Box, Brain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * SkillsRoadmap Component
 * Visual roadmap showing skill categories as vertical paths
 * Each path displays skills as connected nodes with levels
 */
export default function SkillsRoadmap() {
    const containerRef = useRef<HTMLElement>(null);

    const parentSkills = skills.filter((skill) => skill.category === "parent");
    const childSkills = skills.filter((skill) => skill.category === "child");

    // Icon mapping for each category
    const categoryIcons: Record<number, React.ReactNode> = {
        1: <Code className="w-6 h-6" />,
        2: <Database className="w-6 h-6" />,
        3: <Palette className="w-6 h-6" />,
        4: <Box className="w-6 h-6" />,
        5: <Brain className="w-6 h-6" />,
    };

    useGSAP(
        () => {
            // Animate roadmap paths on scroll
            parentSkills.forEach((parent) => {
                const pathId = `roadmap-path-${parent.id}`;
                const nodesClass = `.skill-node-${parent.id}`;

                // Animate the path line
                gsap.fromTo(
                    `#${pathId}`,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "power2.out",
                        duration: 1,
                        scrollTrigger: {
                            trigger: `#${pathId}`,
                            start: "top 80%",
                            end: "bottom 60%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                // Animate skill nodes
                gsap.from(nodesClass, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: `#${pathId}`,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        },
        { scope: containerRef, dependencies: [parentSkills] }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen px-4 md:px-16 py-20 bg-dark-bg"
        >
            {/* Section title */}
            <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-glow mb-4">
                    Skills Roadmap
                </h2>
                <p className="text-foreground/60 text-lg">
                    Mon parcours de compétences techniques
                </p>
            </div>

            {/* Roadmap grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                    {parentSkills.map((parent) => {
                        const children = childSkills.filter(
                            (child) => child.parentId === parent.id
                        );

                        return (
                            <div key={parent.id} className="relative">
                                {/* Category header */}
                                <div className="glass-card p-4 rounded-xl mb-6 text-center">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <div className="text-primary">
                                            {categoryIcons[parent.id]}
                                        </div>
                                        <h3 className="text-xl font-display font-bold">
                                            {parent.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Vertical path */}
                                <div className="relative">
                                    {/* Path line */}
                                    <div
                                        id={`roadmap-path-${parent.id}`}
                                        className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary-light to-primary/50 origin-top -translate-x-1/2 rounded-full shadow-lg shadow-primary/30"
                                    />

                                    {/* Skill nodes */}
                                    <div className="relative space-y-8 pt-4 pb-4">
                                        {children.map((child, index) => (
                                            <div
                                                key={child.id}
                                                className={cn(
                                                    `skill-node-${parent.id}`,
                                                    "relative"
                                                )}
                                            >
                                                {/* Node circle */}
                                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 z-10" />

                                                {/* Skill card */}
                                                <div
                                                    className={cn(
                                                        "glass-card p-3 rounded-lg",
                                                        "hover-glow",
                                                        index % 2 === 0
                                                            ? "ml-10"
                                                            : "mr-10"
                                                    )}
                                                >
                                                    <div className="mb-2">
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {child.name}
                                                        </p>
                                                    </div>

                                                    {/* Level indicator */}
                                                    {child.level && (
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-foreground/60">
                                                                    Niveau
                                                                </span>
                                                                <span className="text-xs text-primary font-semibold">
                                                                    {child.level}%
                                                                </span>
                                                            </div>
                                                            <div className="w-full h-1.5 bg-dark-border rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                                                                    style={{
                                                                        width: `${child.level}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Connecting line to node */}
                                                <div
                                                    className={cn(
                                                        "absolute top-1/2 -translate-y-1/2 w-8 h-0.5 bg-primary/30",
                                                        index % 2 === 0
                                                            ? "left-1/2 -ml-0.5"
                                                            : "right-1/2 -mr-0.5"
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* End cap */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/50 shadow-lg shadow-primary/30" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
