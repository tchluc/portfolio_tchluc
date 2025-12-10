"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive mouse follower animation
 * Creates a smooth gradient effect that follows the cursor
 */
export default function MouseFollower() {
    const follower1Ref = useRef<HTMLDivElement>(null);
    const follower2Ref = useRef<HTMLDivElement>(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const currentX1 = useRef(0);
    const currentY1 = useRef(0);
    const currentX2 = useRef(0);
    const currentY2 = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
        };

        const animate = () => {
            // Smooth interpolation for primary follower (slower, more lag)
            currentX1.current += (mouseX.current - currentX1.current) * 0.08;
            currentY1.current += (mouseY.current - currentY1.current) * 0.08;

            // Faster interpolation for secondary follower
            currentX2.current += (mouseX.current - currentX2.current) * 0.15;
            currentY2.current += (mouseY.current - currentY2.current) * 0.15;

            if (follower1Ref.current) {
                follower1Ref.current.style.transform = `translate(${currentX1.current}px, ${currentY1.current}px) translate(-50%, -50%)`;
            }

            if (follower2Ref.current) {
                follower2Ref.current.style.transform = `translate(${currentX2.current}px, ${currentY2.current}px) translate(-50%, -50%)`;
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
            {/* Main gradient follower - larger and slower */}
            <div
                ref={follower1Ref}
                className="pointer-events-none fixed top-0 left-0 z-50 w-96 h-96 opacity-40 blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, rgba(168, 85, 247, 0.4) 40%, rgba(236, 72, 153, 0.2) 60%, transparent 80%)",
                    mixBlendMode: "hard-light",
                    willChange: "transform",
                }}
            />

            {/* Secondary smaller follower - faster movement */}
            <div
                ref={follower2Ref}
                className="pointer-events-none fixed top-0 left-0 z-40 w-64 h-64 opacity-30 blur-2xl"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(249, 115, 22, 0.4) 50%, transparent 70%)",
                    mixBlendMode: "color-dodge",
                    willChange: "transform",
                }}
            />
        </>
    );
}
