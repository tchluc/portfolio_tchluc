"use client";

import { education } from "@/data/portfolio";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

/**
 * EducationTimeline Component - Minimalist
 * Simple vertical timeline showing education history
 */
export default function EducationTimeline() {
    return (
        <section
            id="education"
            className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
        >
            <div className="max-w-5xl mx-auto">
                {/* Section title */}
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Parcours Académique
                    </h2>
                    <p className="text-muted text-base">
                        Mon cheminement éducatif
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-8">
                    {education.map((item) => (
                        <div key={item.id} className="minimal-card">
                            {/* Year badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-primary font-bold">
                                    {item.year}
                                </span>
                            </div>

                            {/* Degree */}
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                {item.degree}
                            </h3>

                            {/* School */}
                            <div className="flex items-center gap-3 mb-3">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                <h4 className="text-lg md:text-xl font-semibold text-foreground">
                                    {item.school}
                                </h4>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-muted mb-4">
                                <MapPin className="w-4 h-4" />
                                <span>{item.location}</span>
                            </div>

                            {/* Description */}
                            <p className="text-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
