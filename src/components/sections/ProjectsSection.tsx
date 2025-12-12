"use client";

import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { ExternalLink, Filter, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/types";
import ProjectModal from "@/components/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

// Number of filters to show initially
const INITIAL_FILTER_COUNT = 5;

/**
 * ProjectsSection Component
 * Horizontal scroll gallery with parallax effects
 * Features: filters by technology, modal for detailed view
 * Triggered by vertical scroll using GSAP ScrollTrigger
 */
export default function ProjectsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAllFilters, setShowAllFilters] = useState(false);

    // Extract unique tags from all projects
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach((project) => {
            project.tags.forEach((tag) => tags.add(tag));
        });
        return ["all", ...Array.from(tags)];
    }, []);

    // Get visible filters based on showAllFilters state
    const visibleTags = showAllFilters ? allTags : allTags.slice(0, INITIAL_FILTER_COUNT + 1);
    const hasMoreFilters = allTags.length > INITIAL_FILTER_COUNT + 1;

    // Filter projects based on active filter
    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return projects;
        return projects.filter((project) =>
            project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
        );
    }, [activeFilter]);

    useGSAP(
        () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            // Calculate total scroll width
            const scrollWidth = container.scrollWidth - window.innerWidth;

            // Horizontal scroll animation
            gsap.to(container, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Parallax on images - slower than cards
            gsap.to(".project-image", {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                },
            });

            // Scale animation on titles
            gsap.to(".project-title", {
                scale: 0.95,
                opacity: 0.7,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                },
            });
        },
        { scope: containerRef, dependencies: [filteredProjects] }
    );

    const handleOpenModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <>
            <section
                id="projects"
                ref={containerRef}
                className="relative min-h-screen overflow-hidden bg-light-surface dark:bg-dark-surface"
            >
                {/* Section title and filters */}
                <div className="absolute top-8 sm:top-12 left-4 sm:left-8 md:left-16 z-10 right-4 sm:right-8 md:right-16">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-glow">
                                Projets Réalisés
                            </h2>
                            <p className="mt-2 text-foreground/60 text-sm sm:text-base">
                                Scrollez horizontalement pour explorer
                            </p>
                        </div>

                        {/* Filter buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 flex-shrink-0" />
                            {visibleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    className={cn(
                                        "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full",
                                        "transition-all duration-300",
                                        "border flex-shrink-0",
                                        activeFilter === tag
                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                                            : "glass-card text-foreground/70 border-primary/20 hover:border-primary/50 hover:text-primary"
                                    )}
                                >
                                    {tag === "all" ? "Tous" : tag}
                                </button>
                            ))}
                            {hasMoreFilters && (
                                <button
                                    onClick={() => setShowAllFilters(!showAllFilters)}
                                    className={cn(
                                        "px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full",
                                        "transition-all duration-300",
                                        "glass-card text-primary border border-primary/20",
                                        "hover:border-primary/50 hover:bg-primary/10",
                                        "flex items-center gap-1 flex-shrink-0"
                                    )}
                                >
                                    {showAllFilters ? (
                                        <>
                                            <span>Moins</span>
                                            <ChevronUp className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            <span>Plus</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Horizontal scroll container */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center h-screen gap-8 px-8 md:px-16"
                >
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={cn(
                                "flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw]",
                                "relative group"
                            )}
                        >
                            {/* Project card */}
                            <div
                                className={cn(
                                    "modern-card",
                                    "hover-glow",
                                    "overflow-hidden",
                                    "border-2 border-transparent hover:border-primary/30",
                                    "gpu-accelerated"
                                )}
                            >
                                {/* Project image */}
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-500">
                                    <div className="project-image absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl md:text-8xl font-bold text-primary/30 mb-2">
                                                #{index + 1}
                                            </div>
                                            <div className="text-sm text-foreground/40 uppercase tracking-wider">
                                                Projet
                                            </div>
                                        </div>
                                    </div>
                                    {/* Shimmer effect on hover */}
                                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* View details overlay */}
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className={cn(
                                            "absolute inset-0 flex items-center justify-center",
                                            "bg-navy/60 opacity-0 group-hover:opacity-100",
                                            "transition-opacity duration-300",
                                            "cursor-pointer"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-2 px-6 py-3 rounded-full",
                                            "bg-primary text-white font-semibold",
                                            "transform scale-90 group-hover:scale-100",
                                            "transition-transform duration-300"
                                        )}>
                                            <Eye className="w-5 h-5" />
                                            <span>Voir Détails</span>
                                        </div>
                                    </button>
                                </div>

                                {/* Project info */}
                                <div className="space-y-4">
                                    <h3 className="project-title text-2xl md:text-3xl font-display font-bold gradient-text">
                                        {project.title}
                                    </h3>

                                    <p className="text-foreground/70 line-clamp-3 text-base md:text-lg leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                onClick={() => setActiveFilter(tag)}
                                                className={cn(
                                                    "px-4 py-2 text-sm font-medium rounded-full cursor-pointer",
                                                    "border border-primary/20",
                                                    "hover:bg-primary/20 hover:scale-105",
                                                    "transition-all duration-300",
                                                    activeFilter === tag
                                                        ? "bg-primary/20 text-primary"
                                                        : "bg-primary/10 text-primary"
                                                )}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleOpenModal(project)}
                                            className={cn(
                                                "inline-flex items-center gap-2 mt-4",
                                                "px-6 py-3 rounded-full",
                                                "bg-primary text-white font-medium",
                                                "hover:bg-primary-dark",
                                                "transition-all duration-300",
                                                "hover:scale-105"
                                            )}
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Détails</span>
                                        </button>

                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "inline-flex items-center gap-2 mt-4",
                                                    "px-6 py-3 rounded-full",
                                                    "glass-card text-foreground font-medium",
                                                    "border border-primary/30 hover:border-primary",
                                                    "transition-all duration-300",
                                                    "group/link hover:scale-105"
                                                )}
                                            >
                                                <span>Voir</span>
                                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End spacer */}
                    <div className="flex-shrink-0 w-8" />
                </div>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
