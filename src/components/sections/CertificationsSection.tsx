"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { ExternalLink, Calendar, Award, CheckCircle } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * CertificationsSection Component
 * 3D flip cards showing badges on front and skills on back
 * Hover to flip and reveal certification skills
 */
export default function CertificationsSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Stagger animation for certification cards
            gsap.from(".cert-card", {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen px-4 md:px-16 py-32 bg-dark-bg"
        >
            {/* Section title */}
            <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-glow mb-4">
                    Certifications
                </h2>
                <p className="text-foreground/60 text-lg">
                    Survolez les cartes pour voir les compétences
                </p>
            </div>

            {/* Grid container */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert) => (
                        <div
                            key={cert.id}
                            className="cert-card h-[450px]"
                            style={{ perspective: "1000px" }}
                        >
                            {/* Flip container */}
                            <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                                <div
                                    className="flip-card-inner group"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transition: "transform 0.7s",
                                    }}
                                >
                                    {/* Front of card - Badge */}
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "absolute inset-0",
                                            "glass-card rounded-2xl overflow-hidden",
                                            "backface-hidden"
                                        )}
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        {/* Badge display */}
                                        <div className="bg-gradient-to-br from-dark-surface to-dark-border p-8 flex items-center justify-center min-h-[280px]">
                                            {cert.badgeUrl ? (
                                                <div className="relative w-full h-full max-w-[200px] max-h-[200px]">
                                                    <Image
                                                        src={cert.badgeUrl}
                                                        alt={`${cert.name} badge`}
                                                        width={200}
                                                        height={200}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </div>
                                            ) : (
                                                <Award className="w-32 h-32 text-primary/30" />
                                            )}
                                        </div>

                                        {/* Certification info */}
                                        <div className="p-6 space-y-4 bg-dark-surface/50">
                                            <h3 className="text-xl font-display font-bold text-foreground leading-snug min-h-[56px] flex items-center">
                                                {cert.name}
                                            </h3>

                                            <div className="pt-2 border-t border-dark-border/30">
                                                <p className="text-base text-primary font-semibold mb-1">
                                                    {cert.issuer}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-foreground/60">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{cert.date}</span>
                                                </div>
                                            </div>

                                            <div className="pt-3 flex items-center justify-between text-primary/70 text-sm font-medium">
                                                <span>Survolez pour les skills</span>
                                            </div>
                                        </div>
                                    </a>

                                    {/* Back of card - Skills */}
                                    <div
                                        className={cn(
                                            "absolute inset-0",
                                            "glass-card rounded-2xl overflow-hidden",
                                            "bg-gradient-to-br from-primary/20 to-primary/5",
                                            "p-8 flex flex-col justify-center"
                                        )}
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)",
                                        }}
                                    >
                                        {/* Skills header */}
                                        <div className="mb-6">
                                            <h4 className="text-2xl font-display font-bold text-primary mb-2">
                                                Compétences
                                            </h4>
                                            <p className="text-sm text-foreground/60">
                                                {cert.name}
                                            </p>
                                        </div>

                                        {/* Skills list */}
                                        <div className="space-y-3 flex-1">
                                            {cert.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 glass-card p-3 rounded-lg hover-glow"
                                                >
                                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                    <span className="text-foreground font-medium">
                                                        {skill}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* View credential link */}
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 flex items-center justify-center gap-2 glass-card p-4 rounded-lg text-primary font-semibold hover:bg-primary/10 transition-colors"
                                        >
                                            <span>Voir le badge</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* CSS animation trigger */}
                            <style jsx>{`
                                .flip-card-inner {
                                    width: 100%;
                                    height: 100%;
                                    position: relative;
                                    transform-style: preserve-3d;
                                    transition: transform 0.7s;
                                }

                                .cert-card:hover .flip-card-inner {
                                    transform: rotateY(180deg);
                                }

                                .backface-hidden {
                                    -webkit-backface-visibility: hidden;
                                    backface-visibility: hidden;
                                }
                            `}</style>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
