"use client";

import { useEffect, useRef, useCallback } from "react";
import { Project } from "@/types";
import { cn } from "@/lib/cn";
import { X, ExternalLink, Github, Tag } from "lucide-react";
import gsap from "gsap";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * ProjectModal Component
 * Glassmorphism modal for detailed project view
 * Features smooth GSAP animations for open/close
 */
export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && project) {
            // Animate modal open
            gsap.set(backdropRef.current, { opacity: 0 });
            gsap.set(contentRef.current, { scale: 0.9, opacity: 0, y: 50 });

            gsap.to(backdropRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(contentRef.current, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "back.out(1.7)",
                delay: 0.1,
            });

            // Prevent body scroll
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, project]);

    const handleClose = useCallback(() => {
        // Animate modal close
        gsap.to(contentRef.current, {
            scale: 0.9,
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power2.in",
        });

        gsap.to(backdropRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            delay: 0.1,
            onComplete: onClose,
        });
    }, [onClose]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, handleClose]);

    if (!isOpen || !project) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-navy/80 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Modal content */}
            <div
                ref={contentRef}
                className={cn(
                    "relative max-w-3xl w-full max-h-[90vh] overflow-y-auto",
                    "glass-card-strong rounded-2xl sm:rounded-3xl",
                    "p-4 sm:p-6 md:p-10",
                    "border-2 border-primary/20"
                )}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className={cn(
                        "absolute top-4 right-4 z-10",
                        "w-10 h-10 rounded-full",
                        "glass-card flex items-center justify-center",
                        "text-foreground/60 hover:text-primary",
                        "transition-all duration-300",
                        "hover:scale-110 hover:rotate-90"
                    )}
                    aria-label="Fermer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Project image placeholder */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-8xl font-bold text-primary/30 mb-2">
                                #{project.id}
                            </div>
                            <div className="text-sm text-foreground/40 uppercase tracking-wider">
                                Project Preview
                            </div>
                        </div>
                    </div>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer" />
                </div>

                {/* Project title */}
                <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
                    {project.title}
                </h2>

                {/* Project description */}
                <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-foreground/70">Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-full",
                                    "bg-primary/10 text-primary border border-primary/20",
                                    "hover:bg-primary/20 hover:scale-105",
                                    "transition-all duration-300"
                                )}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-2",
                                "px-6 py-3 rounded-full",
                                "bg-primary text-white font-semibold",
                                "hover:bg-primary-dark",
                                "transition-all duration-300",
                                "hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                            )}
                        >
                            <ExternalLink className="w-5 h-5" />
                            <span>Voir le Projet</span>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-2",
                                "px-6 py-3 rounded-full",
                                "glass-card text-foreground font-semibold",
                                "hover:bg-primary/10 border border-primary/20",
                                "transition-all duration-300",
                                "hover:scale-105"
                            )}
                        >
                            <Github className="w-5 h-5" />
                            <span>Code Source</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
