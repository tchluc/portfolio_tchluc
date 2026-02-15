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
            <div className="w-10 h-10 rounded-md border border-light-border dark:border-dark-border flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-muted/20 animate-pulse" />
            </div>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200",
                "border border-light-border dark:border-dark-border bg-surface",
                "text-muted hover:text-primary hover:border-primary",
                "active:scale-95"
            )}
            aria-label="Toggle theme"
        >
            <div className="theme-icon">
                {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-primary" />
                ) : (
                    <Moon className="w-5 h-5 text-primary" />
                )}
            </div>
        </button>
    );
}
