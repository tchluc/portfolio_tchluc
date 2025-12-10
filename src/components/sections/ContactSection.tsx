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
            icon: <Mail className="w-6 h-6" />,
            href: "mailto:votre.email@example.com",
            label: "votre.email@example.com",
            color: "hover:text-blue-400",
        },
        {
            name: "GitHub",
            icon: <Github className="w-6 h-6" />,
            href: "https://github.com/votre-username",
            label: "@votre-username",
            color: "hover:text-purple-400",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-6 h-6" />,
            href: "https://linkedin.com/in/votre-profile",
            label: "/in/votre-profile",
            color: "hover:text-cyan-400",
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-6 h-6" />,
            href: "https://twitter.com/votre-username",
            label: "@votre-username",
            color: "hover:text-sky-400",
        },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center px-4 md:px-16 py-32 bg-light-surface dark:bg-dark-surface"
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* Title */}
                <div className="text-center mb-16 contact-title">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-glow mb-6">
                        Travaillons ensemble
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
                        Vous avez un projet en tête ? Contactez-moi et discutons de la façon dont je peux vous aider.
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
                                "glass-card p-8 rounded-2xl",
                                "group",
                                "transition-all duration-300",
                                "hover:scale-105 hover-glow"
                            )}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className={cn(
                                    "text-primary transition-colors duration-300",
                                    link.color
                                )}>
                                    {link.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg mb-1">
                                        {link.name}
                                    </h3>
                                    <p className="text-sm text-foreground/60 break-all">
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
                        href="mailto:votre.email@example.com"
                        className={cn(
                            "inline-flex items-center gap-3",
                            "glass-card px-8 py-4 rounded-full",
                            "text-lg font-semibold",
                            "text-primary",
                            "hover:bg-primary/10",
                            "transition-all duration-300",
                            "hover:scale-105",
                            "group"
                        )}
                    >
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Envoyer un message</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
