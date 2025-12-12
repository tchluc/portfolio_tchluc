"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    shape: "circle" | "triangle" | "hexagon";
    rotation: number;
    rotationSpeed: number;
    color: string;
}

/**
 * ParticleBackground Component
 * GPU-accelerated geometric particle system with mouse reactivity
 * Renders circles, triangles, and hexagons that respond to cursor movement
 * Optimized for 60fps performance
 */
export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number>(0);

    // Color palette - Navy/Teal/Blue theme
    const colors = [
        "rgba(20, 184, 166, 0.6)",   // Teal
        "rgba(59, 130, 246, 0.6)",   // Blue
        "rgba(99, 102, 241, 0.5)",   // Indigo
        "rgba(45, 212, 191, 0.4)",   // Teal light
        "rgba(96, 165, 250, 0.4)",   // Blue light
    ];

    const initParticles = useCallback((width: number, height: number) => {
        const particleCount = Math.min(80, Math.floor((width * height) / 15000));
        const shapes: ("circle" | "triangle" | "hexagon")[] = ["circle", "triangle", "hexagon"];

        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5 + 0.2,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
    }, []);

    const drawShape = useCallback((
        ctx: CanvasRenderingContext2D,
        particle: Particle
    ) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;

        switch (particle.shape) {
            case "circle":
                ctx.beginPath();
                ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                ctx.fill();
                break;
            case "triangle":
                ctx.beginPath();
                ctx.moveTo(0, -particle.size);
                ctx.lineTo(-particle.size * 0.866, particle.size * 0.5);
                ctx.lineTo(particle.size * 0.866, particle.size * 0.5);
                ctx.closePath();
                ctx.stroke();
                break;
            case "hexagon":
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const x = particle.size * Math.cos(angle);
                    const y = particle.size * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
                break;
        }

        ctx.restore();
    }, []);

    const drawConnections = useCallback((
        ctx: CanvasRenderingContext2D,
        particles: Particle[]
    ) => {
        const connectionDistance = 120;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        const particles = particlesRef.current;
        const mouse = mouseRef.current;
        const mouseRadius = 150;

        // Update and draw particles
        particles.forEach((particle) => {
            // Mouse attraction/repulsion
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius && distance > 0) {
                const force = (mouseRadius - distance) / mouseRadius;
                const angle = Math.atan2(dy, dx);
                // Subtle attraction towards mouse
                particle.vx += Math.cos(angle) * force * 0.02;
                particle.vy += Math.sin(angle) * force * 0.02;
            }

            // Apply velocity with damping
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            particle.rotation += particle.rotationSpeed;

            // Wrap around edges
            if (particle.x < -20) particle.x = width + 20;
            if (particle.x > width + 20) particle.x = -20;
            if (particle.y < -20) particle.y = height + 20;
            if (particle.y > height + 20) particle.y = -20;

            drawShape(ctx, particle);
        });

        // Draw connections between nearby particles
        drawConnections(ctx, particles);

        animationRef.current = requestAnimationFrame(animate);
    }, [drawShape, drawConnections]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // Initial setup
        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Start animation
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [animate, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: "transparent",
            }}
        />
    );
}
