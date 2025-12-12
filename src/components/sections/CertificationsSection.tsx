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
            id="certifications"
            ref={containerRef}
            className="relative min-h-screen px-4 md:px-16 py-32 bg-light-bg dark:bg-dark-bg"
        >
            {/* Section title */}
            <div className="max-w-7xl mx-auto mb-12 sm:mb-16 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-glow mb-4 sm:mb-6">
                    Certifications Professionnelles
                </h2>
                <p className="text-foreground/60 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
                    Mes certifications validées par des organisations reconnues.
                    Survolez les cartes pour découvrir les compétences acquises.
                </p>
            </div>

            {/* Grid container */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert) => (
                        <div
                            key={cert.id}
                            className="cert-card h-[380px] sm:h-[420px] md:h-[450px]"
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
                                            "modern-card rounded-3xl overflow-hidden",
                                            "backface-hidden border-2 border-transparent hover:border-primary/30"
                                        )}
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        {/* Badge display */}
                                        <div className="bg-gradient-to-br from-primary/10 via-purple-500/5 to-light-surface dark:to-dark-surface p-8 flex items-center justify-center min-h-[280px] relative overflow-hidden">
                                            {/* Background decoration */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                                            {cert.badgeUrl ? (
                                                <div className="relative w-full h-full max-w-[200px] max-h-[200px] z-10 hover:scale-110 transition-transform duration-500">
                                                    <Image
                                                        src={cert.badgeUrl}
                                                        alt={`${cert.name} badge`}
                                                        width={200}
                                                        height={200}
                                                        className="object-contain w-full h-full drop-shadow-2xl"
                                                    />
                                                </div>
                                            ) : (
                                                <Award className="w-32 h-32 text-primary/30 z-10" />
                                            )}
                                        </div>

                                        {/* Certification info */}
                                        <div className="p-6 space-y-4 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm">
                                            <h3 className="text-xl font-display font-bold text-foreground leading-snug min-h-[56px] flex items-center">
                                                {cert.name}
                                            </h3>

                                            <div className="pt-2 border-t border-primary/20">
                                                <p className="text-base text-primary font-bold mb-2">
                                                    {cert.issuer}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-foreground/60 font-medium">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    <span>{cert.date}</span>
                                                </div>
                                            </div>

                                            <div className="pt-3 flex items-center justify-center gap-2 text-primary text-sm font-semibold bg-primary/10 rounded-full py-2">
                                                <span>✨ Survolez pour les compétences</span>
                                            </div>
                                        </div>
                                    </a>

                                    {/* Back of card - Skills */}
                                    <div
                                        className={cn(
                                            "absolute inset-0",
                                            "modern-card rounded-3xl overflow-hidden",
                                            "bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/5",
                                            "p-6 md:p-8 flex flex-col justify-center border-2 border-primary/30"
                                        )}
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)",
                                        }}
                                    >
                                        {/* Background decoration */}
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />

                                        {/* Skills header */}
                                        <div className="mb-6 relative z-10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Award className="w-8 h-8 text-primary" />
                                                <h4 className="text-2xl md:text-3xl font-display font-bold text-primary">
                                                    Compétences
                                                </h4>
                                            </div>
                                            <p className="text-sm text-foreground/70 font-medium line-clamp-2">
                                                {cert.name}
                                            </p>
                                        </div>

                                        {/* Skills list */}
                                        <div className="space-y-3 flex-1 overflow-y-auto relative z-10 max-h-[240px]">
                                            {cert.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 glass-card p-3 md:p-4 rounded-xl hover:scale-105 hover:bg-primary/20 transition-all duration-300"
                                                >
                                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                    <span className="text-foreground font-semibold text-sm md:text-base">
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
                                            className="mt-6 flex items-center justify-center gap-2 bg-primary text-white p-4 rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg relative z-10"
                                        >
                                            <span>Voir le Badge</span>
                                            <ExternalLink className="w-5 h-5" />
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
