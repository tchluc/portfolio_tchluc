"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Briefcase, GraduationCap, Code, Award, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { id: "hero", label: "Accueil", icon: <Home className="w-4 h-4" /> },
    { id: "projects", label: "Projets", icon: <Briefcase className="w-4 h-4" /> },
    { id: "github", label: "GitHub", icon: <Code className="w-4 h-4" /> },
    { id: "education", label: "Formation", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "skills", label: "Compétences", icon: <Code className="w-4 h-4" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

/**
 * Navigation Component
 * Floating glassmorphism navigation with scroll-based visibility
 * Shows/hides based on scroll direction
 */
export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const navRef = useRef<HTMLElement>(null);

    // Handle scroll visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show on scroll up, hide on scroll down (after initial threshold)
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

    // GSAP animation for nav appearance
    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5,
        });
    }, { scope: navRef });

    // Track active section based on scroll position
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
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            ref={navRef}
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50",
                "transition-all duration-500 ease-out",
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
            )}
        >
            <div
                className={cn(
                    "glass-card-strong px-2 py-2 rounded-full",
                    "flex items-center gap-1",
                    "shadow-lg shadow-primary/10"
                )}
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                            "relative flex items-center gap-2 px-4 py-2.5 rounded-full",
                            "transition-all duration-300",
                            "text-sm font-medium",
                            activeSection === item.id
                                ? "text-white"
                                : "text-foreground/60 hover:text-foreground"
                        )}
                    >
                        {/* Active background */}
                        {activeSection === item.id && (
                            <span
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse-glow"
                                style={{ zIndex: -1 }}
                            />
                        )}

                        <span className="relative z-10">{item.icon}</span>
                        <span className="relative z-10 hidden md:inline">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
