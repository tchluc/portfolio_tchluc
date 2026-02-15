"use client";

import { useState, useMemo } from "react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { ExternalLink, Filter, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/types";
import ProjectModal from "@/components/ProjectModal";

// Number of filters to show initially
const INITIAL_FILTER_COUNT = 5;

/**
 * ProjectsSection Component - Minimalist
 * Simple vertical grid with filters
 */
export default function ProjectsSection() {
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
                className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Section title and filters */}
                    <div className="mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                            Projets Réalisés
                        </h2>
                        <p className="text-muted text-base">
                            Découvrez mes réalisations
                        </p>

                        {/* Filter buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6">
                            <Filter className="w-4 h-4 text-primary mr-1 flex-shrink-0" />
                            {visibleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    className={cn(
                                        "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full",
                                        "transition-all duration-200",
                                        "border flex-shrink-0",
                                        activeFilter === tag
                                            ? "bg-primary text-white border-primary"
                                            : "bg-surface text-muted border-border hover:border-primary hover:text-primary"
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
                                        "bg-surface text-primary border border-border",
                                        "hover:border-primary",
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

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProjects.map((project, index) => (
                            <div key={project.id} className="minimal-card group">
                                {/* Project placeholder image */}
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-surface-secondary flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-muted mb-1">
                                            #{index + 1}
                                        </div>
                                        <div className="text-xs text-muted uppercase tracking-wider">
                                            Projet
                                        </div>
                                    </div>

                                    {/* View details overlay */}
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className={cn(
                                            "absolute inset-0 flex items-center justify-center",
                                            "bg-black/60 opacity-0 group-hover:opacity-100",
                                            "transition-opacity duration-200"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-medium text-sm">
                                            <Eye className="w-4 h-4" />
                                            <span>Voir Détails</span>
                                        </div>
                                    </button>
                                </div>

                                {/* Project info */}
                                <div className="space-y-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted line-clamp-2 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                onClick={() => setActiveFilter(tag)}
                                                className={cn(
                                                    "px-3 py-1 text-xs font-medium rounded-full cursor-pointer",
                                                    "border border-border transition-colors",
                                                    activeFilter === tag
                                                        ? "bg-primary/10 text-primary border-primary"
                                                        : "hover:border-primary hover:text-primary"
                                                )}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="px-3 py-1 text-xs text-muted">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleOpenModal(project)}
                                            className="btn-primary text-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Détails</span>
                                        </button>

                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary text-sm group/link"
                                            >
                                                <span>Voir</span>
                                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
