"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactSection Component
 * Modern contact section with social links and email
 * Animated cards on scroll
 */
export default function ContactSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Animate contact cards
            gsap.from(".contact-card", {
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

            // Animate title
            gsap.from(".contact-title", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });
        },
        { scope: containerRef }
    );

    const socialLinks = [
        {
            name: "Email",
            icon: <Mail className="w-8 h-8" />,
            href: "mailto:tchamdjaluc@gmail.com",
            label: "tchamdjaluc@gmail.com",
            color: "hover:text-blue-400",
            bgGradient: "from-blue-500/20 to-cyan-500/20",
        },
        {
            name: "GitHub",
            icon: <Github className="w-8 h-8" />,
            href: "https://github.com/tchluc",
            label: "@tchluc",
            color: "hover:text-purple-400",
            bgGradient: "from-purple-500/20 to-pink-500/20",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-8 h-8" />,
            href: "https://linkedin.com/in/luc-tchamdja",
            label: "/in/luc-tchamdja",
            color: "hover:text-cyan-400",
            bgGradient: "from-cyan-500/20 to-blue-500/20",
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-8 h-8" />,
            href: "https://twitter.com/tchluc",
            label: "@tchluc",
            color: "hover:text-sky-400",
            bgGradient: "from-sky-500/20 to-indigo-500/20",
        },
    ];

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative min-h-screen flex items-center px-4 md:px-16 py-32 bg-light-surface dark:bg-dark-surface overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl gpu-accelerated" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl gpu-accelerated" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Title */}
                <div className="text-center mb-12 sm:mb-16 contact-title">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-glow mb-4 sm:mb-6">
                        Travaillons Ensemble
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed px-2">
                        Vous avez un projet innovant ? Discutons de la façon dont je peux contribuer
                        à votre réussite avec mes compétences en IA et Data Science.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.name !== "Email" ? "_blank" : undefined}
                            rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                            className={cn(
                                "contact-card",
                                "modern-card",
                                "group relative overflow-hidden",
                                "transition-all duration-300",
                                "hover:scale-105",
                                "gpu-accelerated"
                            )}
                        >
                            {/* Background gradient on hover */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                link.bgGradient
                            )} />

                            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                <div className={cn(
                                    "text-primary transition-all duration-300",
                                    link.color,
                                    "group-hover:scale-110"
                                )}>
                                    {link.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl mb-2">
                                        {link.name}
                                    </h3>
                                    <p className="text-sm md:text-base text-foreground/60 break-all">
                                        {link.label}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <a
                        href="mailto:tchamdjaluc@gmail.com"
                        className={cn(
                            "inline-flex items-center gap-3",
                            "px-10 py-5 rounded-full",
                            "bg-primary text-white font-semibold text-lg",
                            "hover-glow pulse-border",
                            "transition-all duration-300",
                            "group"
                        )}
                    >
                        <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Envoyer un Message</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
