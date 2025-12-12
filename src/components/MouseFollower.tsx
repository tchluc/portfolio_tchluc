"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive mouse follower animation
 * Creates smooth gradient orbs that follow the cursor
 * Navy/Teal/Blue theme with GPU acceleration
 */
export default function MouseFollower() {
    const follower1Ref = useRef<HTMLDivElement>(null);
    const follower2Ref = useRef<HTMLDivElement>(null);
    const follower3Ref = useRef<HTMLDivElement>(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const currentX1 = useRef(0);
    const currentY1 = useRef(0);
    const currentX2 = useRef(0);
    const currentY2 = useRef(0);
    const currentX3 = useRef(0);
    const currentY3 = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
        };

        const animate = () => {
            // Primary follower - slowest, largest (Teal)
            currentX1.current += (mouseX.current - currentX1.current) * 0.06;
            currentY1.current += (mouseY.current - currentY1.current) * 0.06;

            // Secondary follower - medium speed (Blue)
            currentX2.current += (mouseX.current - currentX2.current) * 0.1;
            currentY2.current += (mouseY.current - currentY2.current) * 0.1;

            // Tertiary follower - fastest, smallest (Indigo)
            currentX3.current += (mouseX.current - currentX3.current) * 0.15;
            currentY3.current += (mouseY.current - currentY3.current) * 0.15;

            if (follower1Ref.current) {
                follower1Ref.current.style.transform = `translate(${currentX1.current}px, ${currentY1.current}px) translate(-50%, -50%)`;
            }

            if (follower2Ref.current) {
                follower2Ref.current.style.transform = `translate(${currentX2.current}px, ${currentY2.current}px) translate(-50%, -50%)`;
            }

            if (follower3Ref.current) {
                follower3Ref.current.style.transform = `translate(${currentX3.current}px, ${currentY3.current}px) translate(-50%, -50%)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            {/* Primary Teal gradient - largest and slowest */}
            <div
                ref={follower1Ref}
                className="pointer-events-none fixed top-0 left-0 z-30 w-[500px] h-[500px] opacity-30 blur-3xl hidden md:block"
                style={{
                    background: "radial-gradient(circle, rgba(20, 184, 166, 0.5) 0%, rgba(20, 184, 166, 0.3) 40%, transparent 70%)",
                    mixBlendMode: "screen",
                    willChange: "transform",
                }}
            />

            {/* Secondary Blue gradient - medium */}
            <div
                ref={follower2Ref}
                className="pointer-events-none fixed top-0 left-0 z-30 w-80 h-80 opacity-25 blur-2xl hidden md:block"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)",
                    mixBlendMode: "screen",
                    willChange: "transform",
                }}
            />

            {/* Tertiary Indigo gradient - smallest and fastest */}
            <div
                ref={follower3Ref}
                className="pointer-events-none fixed top-0 left-0 z-30 w-48 h-48 opacity-20 blur-xl hidden md:block"
                style={{
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.7) 0%, rgba(129, 140, 248, 0.4) 50%, transparent 70%)",
                    mixBlendMode: "screen",
                    willChange: "transform",
                }}
            />
        </>
    );
}

