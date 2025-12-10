"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * ScrollProgress Component
 * Shows scroll progress with a fixed top bar
 */
export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const trackLength = documentHeight - windowHeight;
            const progress = (scrollTop / trackLength) * 100;

            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
            <div
                className={cn(
                    "h-full bg-gradient-to-r from-primary via-purple-500 to-primary-light",
                    "transition-all duration-300 ease-out",
                    "shadow-lg shadow-primary/50"
                )}
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}
