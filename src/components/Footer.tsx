"use client";

import { cn } from "@/lib/cn";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

/**
 * Footer Component
 * Clean footer with social links and copyright
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            icon: <Github className="w-5 h-5" />,
            href: "https://github.com/votre-username",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-5 h-5" />,
            href: "https://linkedin.com/in/votre-profile",
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-5 h-5" />,
            href: "https://twitter.com/votre-username",
        },
        {
            name: "Email",
            icon: <Mail className="w-5 h-5" />,
            href: "mailto:votre.email@example.com",
        },
    ];

    const quickLinks = [
        { name: "Projets", href: "#projects" },
        { name: "Formation", href: "#education" },
        { name: "Compétences", href: "#skills" },
        { name: "Certifications", href: "#certifications" },
    ];

    return (
        <footer className="relative bg-dark-bg border-t border-dark-border/30">
            <div className="max-w-7xl mx-auto px-4 md:px-16 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold gradient-text">
                            Portfolio
                        </h3>
                        <p className="text-foreground/60 text-sm">
                            Développeur Full Stack passionné par la création d'expériences web exceptionnelles.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-display font-semibold text-foreground">
                            Navigation
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-foreground/60 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links Column */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-display font-semibold text-foreground">
                            Suivez-moi
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.name !== "Email" ? "_blank" : undefined}
                                    rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                                    className={cn(
                                        "glass-card p-3 rounded-lg",
                                        "text-foreground/60 hover:text-primary",
                                        "transition-all duration-300",
                                        "hover:scale-110"
                                    )}
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dark-border/30 my-8" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-foreground/40 text-sm">
                        © {currentYear} Portfolio. Tous droits réservés.
                    </p>
                    <p className="text-foreground/40 text-sm flex items-center gap-2">
                        Fait avec <Heart className="w-4 h-4 text-primary fill-primary" /> et Next.js
                    </p>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </footer>
    );
}
