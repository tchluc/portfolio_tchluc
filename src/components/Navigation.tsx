"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
    id: string;
    label: string;
}

const navItems: NavItem[] = [
    { id: "hero", label: "Accueil" },
    { id: "projects", label: "Projets" },
    { id: "github", label: "GitHub" },
    { id: "education", label: "Formation" },
    { id: "skills", label: "Compétences" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
];

/**
 * Navigation Component - Minimalist & Responsive
 * Clean navigation with mobile menu and theme toggle
 */
export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    // Handle scroll visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                setIsVisible(currentScrollY < lastScrollY.current);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(item.id);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });

            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Desktop & Mobile Navigation */}
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-sm",
                    "border-b border-light-border dark:border-dark-border",
                    "transition-transform duration-300",
                    isVisible ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Name */}
                        <button
                            onClick={() => scrollToSection("hero")}
                            className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                        >
                            Luc Tchamdja
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                        activeSection === item.id
                                            ? "text-primary bg-primary/10"
                                            : "text-muted hover:text-foreground hover:bg-surface"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Actions (Theme Toggle + Mobile Menu) */}
                        <div className="flex items-center gap-2">
                            <ThemeToggle />

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
                        <div className="px-4 py-4 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={cn(
                                        "w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                        activeSection === item.id
                                            ? "text-primary bg-primary/10"
                                            : "text-muted hover:text-foreground hover:bg-surface"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer to prevent content from going under fixed nav */}
            <div className="h-16" />
        </>
    );
}
