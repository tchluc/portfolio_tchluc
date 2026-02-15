"use client";

import { cn } from "@/lib/cn";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

/**
 * Footer Component - Minimalist
 * Clean footer with social links and copyright
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            icon: <Github className="w-5 h-5" />,
            href: "https://github.com/tchluc",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-5 h-5" />,
            href: "https://linkedin.com/in/luc-tchamdja",
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-5 h-5" />,
            href: "https://twitter.com/tchluc",
        },
        {
            name: "Email",
            icon: <Mail className="w-5 h-5" />,
            href: "mailto:tchamdjaluc@gmail.com",
        },
    ];

    const quickLinks = [
        { name: "Projets", href: "#projects" },
        { name: "Formation", href: "#education" },
        { name: "Compétences", href: "#skills" },
        { name: "Certifications", href: "#certifications" },
    ];

    return (
        <footer className="border-t border-border">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-foreground">
                            Luc Tchamdja
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                            Ingénieur en Intelligence Artificielle et Data Science,
                            passionné par l&apos;innovation technologique.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-3">
                        <h4 className="text-base font-semibold text-foreground">
                            Navigation
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-muted hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links Column */}
                    <div className="space-y-3">
                        <h4 className="text-base font-semibold text-foreground">
                            Suivez-moi
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.name !== "Email" ? "_blank" : undefined}
                                    rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                                    className={cn(
                                        "text-muted hover:text-primary",
                                        "transition-colors duration-200"
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
                <div className="border-t border-border my-6" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted text-sm">
                        © {currentYear} Luc Tchamdja. Tous droits réservés.
                    </p>
                    <p className="text-muted text-sm flex items-center gap-2">
                        Créé avec <Heart className="w-4 h-4 text-primary fill-primary" /> et Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
