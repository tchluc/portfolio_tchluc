"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive mouse follower animation
 * Creates a smooth gradient effect that follows the cursor
 */
export default function MouseFollower() {
    const followerRef = useRef<HTMLDivElement>(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const currentX = useRef(0);
    const currentY = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
        };

        const animate = () => {
            // Smooth interpolation for fluid movement
            currentX.current += (mouseX.current - currentX.current) * 0.1;
            currentY.current += (mouseY.current - currentY.current) * 0.1;

            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            {/* Main gradient follower */}
            <div
                ref={followerRef}
                className="pointer-events-none fixed top-0 left-0 z-50 w-96 h-96 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.3) 40%, transparent 70%)",
                    mixBlendMode: "screen",
                }}
            />

            {/* Secondary smaller follower for depth */}
            <div
                className="pointer-events-none fixed top-0 left-0 z-40 w-64 h-64 opacity-20 blur-2xl"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(249, 115, 22, 0.3) 50%, transparent 70%)",
                    mixBlendMode: "screen",
                    transform: `translate(calc(${mouseX.current}px - 50%), calc(${mouseY.current}px - 50%))`,
                    transition: "transform 0.2s ease-out",
                }}
            />
        </>
    );
}
