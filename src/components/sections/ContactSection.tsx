"use client";

import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

/**
 * ContactSection Component - Minimalist
 * Simple contact section with social links
 */
export default function ContactSection() {
    const socialLinks = [
        {
            name: "Email",
            icon: <Mail className="w-6 h-6" />,
            href: "mailto:tchamdjaluc@gmail.com",
            label: "tchamdjaluc@gmail.com",
        },
        {
            name: "GitHub",
            icon: <Github className="w-6 h-6" />,
            href: "https://github.com/tchluc",
            label: "@tchluc",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-6 h-6" />,
            href: "https://linkedin.com/in/luc-tchamdja",
            label: "/in/luc-tchamdja",
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-6 h-6" />,
            href: "https://twitter.com/tchluc",
            label: "@tchluc",
        },
    ];

    return (
        <section
            id="contact"
            className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
        >
            <div className="max-w-5xl mx-auto">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Travaillons Ensemble
                    </h2>
                    <p className="text-muted text-base max-w-2xl mx-auto">
                        Vous avez un projet innovant ? Discutons de la façon dont je peux contribuer
                        à votre réussite.
                    </p>
                </div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.name !== "Email" ? "_blank" : undefined}
                            rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                            className="minimal-card group flex items-center gap-4"
                        >
                            <div className="text-primary">
                                {link.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-foreground mb-1">
                                    {link.name}
                                </h3>
                                <p className="text-sm text-muted break-all">
                                    {link.label}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <a
                        href="mailto:tchamdjaluc@gmail.com"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        <span>Envoyer un Message</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
