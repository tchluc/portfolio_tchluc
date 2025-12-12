"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/cn";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Github,
    Star,
    GitFork,
    ExternalLink,
    Code2,
    Calendar,
    Loader2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
    topics: string[];
}

// Language colors for badges
const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Jupyter: "#DA5B0B",
    Notebook: "#DA5B0B",
};

/**
 * GitHubRepos Component
 * Fetches and displays active GitHub repositories
 * Uses the public GitHub API (no auth required for public repos)
 */
export default function GitHubRepos({ username = "tchluc" }: { username?: string }) {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLElement>(null);

    // Fetch repos from GitHub API
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=public`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch repositories");
                }

                const data = await response.json();
                setRepos(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    // GSAP animations
    useGSAP(
        () => {
            if (loading || repos.length === 0) return;

            gsap.from(".github-card", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });
        },
        { scope: containerRef, dependencies: [loading, repos] }
    );

    // Format date to relative time
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`;
        if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
        return `Il y a ${Math.floor(diffDays / 365)} an(s)`;
    };

    return (
        <section
            id="github"
            ref={containerRef}
            className="relative min-h-screen px-4 md:px-16 py-20 bg-light-surface dark:bg-dark-surface"
        >
            {/* Section title */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Github className="w-10 h-10 text-foreground" />
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-glow">
                        Projets GitHub
                    </h2>
                </div>
                <p className="text-foreground/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Mes repositories actifs et projets open source
                </p>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="max-w-lg mx-auto text-center py-20">
                    <p className="text-red-500 mb-4">{error}</p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        <Github className="w-5 h-5" />
                        Voir mon profil GitHub
                    </a>
                </div>
            )}

            {/* Repos grid */}
            {!loading && !error && (
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "github-card group",
                                    "glass-card p-6 rounded-2xl",
                                    "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20",
                                    "transition-all duration-300",
                                    "flex flex-col h-full"
                                )}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Code2 className="w-5 h-5 text-primary" />
                                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                                            {repo.name}
                                        </h3>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                                </div>

                                {/* Description */}
                                <p className="text-foreground/60 text-sm mb-4 line-clamp-2 flex-grow">
                                    {repo.description || "Pas de description"}
                                </p>

                                {/* Language badge */}
                                {repo.language && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor: languageColors[repo.language] || "#858585",
                                            }}
                                        />
                                        <span className="text-sm text-foreground/70">
                                            {repo.language}
                                        </span>
                                    </div>
                                )}

                                {/* Topics */}
                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {repo.topics.slice(0, 3).map((topic) => (
                                            <span
                                                key={topic}
                                                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Footer stats */}
                                <div className="flex items-center gap-4 text-sm text-foreground/50 mt-auto pt-4 border-t border-border/50">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4" />
                                        <span>{repo.stargazers_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="w-4 h-4" />
                                        <span>{repo.forks_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(repo.updated_at)}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* View all link */}
                    <div className="text-center mt-12">
                        <a
                            href={`https://github.com/${username}?tab=repositories`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-2",
                                "px-6 py-3 rounded-full",
                                "glass-card hover:bg-primary/10",
                                "text-foreground font-medium",
                                "transition-all duration-300",
                                "hover:scale-105"
                            )}
                        >
                            <Github className="w-5 h-5" />
                            Voir tous les repos
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}
