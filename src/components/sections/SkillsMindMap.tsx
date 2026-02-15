"use client";

import { skills } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { Code, Database, Palette, Box, Brain } from "lucide-react";

/**
 * SkillsSection Component - Minimalist
 * Simple grid of skill categories and tags
 */
export default function SkillsSection() {
    const parentSkills = skills.filter((skill) => skill.category === "parent");
    const childSkills = skills.filter((skill) => skill.category === "child");

    // Icon mapping for each category
    const categoryIcons: Record<number, React.ReactNode> = {
        1: <Code className="w-5 h-5" />,
        2: <Database className="w-5 h-5" />,
        3: <Palette className="w-5 h-5" />,
        4: <Box className="w-5 h-5" />,
        5: <Brain className="w-5 h-5" />,
    };

    return (
        <section
            id="skills"
            className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section title */}
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
                        Compétences Techniques
                    </h2>
                    <p className="text-muted text-base">
                        Mon expertise technique couvre un large éventail de domaines
                    </p>
                </div>

                {/* Skills grid */}
                <div className="space-y-8">
                    {parentSkills.map((parent) => {
                        const children = childSkills.filter(
                            (child) => child.parentId === parent.id
                        );

                        return (
                            <div key={parent.id} className="minimal-card">
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        {categoryIcons[parent.id]}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                        {parent.name}
                                    </h3>
                                </div>

                                {/* Skills tags */}
                                <div className="flex flex-wrap gap-2">
                                    {children.map((child) => (
                                        <div
                                            key={child.id}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full border border-border",
                                                "text-sm text-foreground",
                                                "transition-colors hover:border-primary hover:text-primary"
                                            )}
                                        >
                                            {child.name}
                                            {child.level && (
                                                <span className="ml-2 text-xs text-muted">
                                                    {child.level}%
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
