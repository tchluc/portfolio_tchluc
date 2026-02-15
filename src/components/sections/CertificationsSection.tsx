"use client";

import { certifications } from "@/data/portfolio";
import { ExternalLink, Calendar, Award, CheckCircle } from "lucide-react";
import Image from "next/image";

/**
 * CertificationsSection Component - Minimalist
 * Simple grid of certification cards
 */
export default function CertificationsSection() {
    return (
        <section
            id="certifications"
            className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section title */}
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Certifications Professionnelles
                    </h2>
                    <p className="text-muted text-base">
                        Mes certifications validées par des organisations reconnues
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="minimal-card">
                            {/* Badge */}
                            {cert.badgeUrl ? (
                                <div className="flex justify-center mb-4">
                                    <Image
                                        src={cert.badgeUrl}
                                        alt={`${cert.name} badge`}
                                        width={120}
                                        height={120}
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center mb-4">
                                    <Award className="w-20 h-20 text-primary" />
                                </div>
                            )}

                            {/* Name */}
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {cert.name}
                            </h3>

                            {/* Issuer */}
                            <p className="text-primary font-semibold mb-2">
                                {cert.issuer}
                            </p>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-muted mb-4">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{cert.date}</span>
                            </div>

                            {/* Skills - First 3 */}
                            {cert.skills && cert.skills.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    {cert.skills.slice(0, 3).map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span className="text-sm text-foreground">{skill}</span>
                                        </div>
                                    ))}
                                    {cert.skills.length > 3 && (
                                        <p className="text-xs text-muted">
                                            +{cert.skills.length - 3} autres compétences
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Link */}
                            <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm"
                            >
                                <span>Voir le badge</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
