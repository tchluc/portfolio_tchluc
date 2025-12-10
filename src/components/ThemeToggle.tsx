"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";

/**
 * ThemeToggle Component
 * Animated button to toggle between dark and light themes
 * Uses GSAP for smooth icon transitions
 */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    // Wait for component to mount to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Apply theme to HTML element
    useEffect(() => {
        if (!mounted) return;
        
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme, mounted]);

    // Animate icon rotation on theme change
    useGSAP(() => {
        gsap.fromTo(
            ".theme-icon",
            { rotate: 0, scale: 1 },
            {
                rotate: 360,
                scale: 1.1,
                duration: 0.5,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(".theme-icon", { scale: 1, duration: 0.2 });
                },
            }
        );
    }, [theme]);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <button
                className={cn(
                    "fixed top-8 right-8 z-50",
                    "w-14 h-14 rounded-full",
                    "glass-card hover-glow",
                    "flex items-center justify-center",
                    "transition-all duration-300"
                )}
                aria-label="Toggle theme"
                disabled
            >
                <div className="theme-icon">
                    <Sun className="w-6 h-6 text-primary" />
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "fixed top-8 right-8 z-50",
                "w-14 h-14 rounded-full",
                "glass-card hover-glow",
                "flex items-center justify-center",
                "transition-all duration-300",
                "hover:scale-110 active:scale-95"
            )}
            aria-label="Toggle theme"
        >
            <div className="theme-icon">
                {theme === "dark" ? (
                    <Sun className="w-6 h-6 text-primary" />
                ) : (
                    <Moon className="w-6 h-6 text-primary" />
                )}
            </div>
        </button>
    );
}
