"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

/**
 * SmoothScroll Component
 * Wraps the app with Lenis smooth scrolling
 * Integrates with GSAP ScrollTrigger automatically
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            }}
        >
            {children}
        </ReactLenis>
    );
}
