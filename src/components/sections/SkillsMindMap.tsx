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
            className="relative min-h-screen px-4 md:px-16 py-20 bg-light-bg dark:bg-dark-bg"
        >
            {/* Section title */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-glow mb-6">
                    Compétences Techniques
                </h2>
                <p className="text-foreground/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Mon expertise technique couvre un large éventail de domaines,
                    de l&apos;IA et la Data Science au développement full-stack
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
                                <div className="modern-card p-6 rounded-2xl mb-8 text-center hover:scale-105 transition-transform duration-300">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary mb-2">
                                            {categoryIcons[parent.id]}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-display font-bold gradient-text">
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
                                                        "modern-card p-4 rounded-xl",
                                                        "hover:scale-105 hover:shadow-2xl",
                                                        "transition-all duration-300",
                                                        "border-2 border-transparent hover:border-primary/30",
                                                        index % 2 === 0
                                                            ? "ml-10"
                                                            : "mr-10"
                                                    )}
                                                >
                                                    <div className="mb-3">
                                                        <p className="text-sm md:text-base font-bold text-foreground">
                                                            {child.name}
                                                        </p>
                                                    </div>

                                                    {/* Level indicator */}
                                                    {child.level && (
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-foreground/60 font-medium">
                                                                    Maîtrise
                                                                </span>
                                                                <span className="text-xs text-primary font-bold">
                                                                    {child.level}%
                                                                </span>
                                                            </div>
                                                            <div className="relative w-full h-2 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
                                                                <div
                                                                    className="absolute h-full bg-gradient-to-r from-primary via-primary-light to-primary rounded-full transition-all duration-700 ease-out"
                                                                    style={{
                                                                        width: `${child.level}%`,
                                                                    }}
                                                                />
                                                                {/* Shine effect */}
                                                                <div className="absolute inset-0 shimmer" />
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
