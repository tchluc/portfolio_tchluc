"use client";

import { useEffect, useState } from "react";
import {
    Github,
    Star,
    GitFork,
    ExternalLink,
    Code2,
    Calendar
} from "lucide-react";

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string | null;
    topics: string[];
    pushed_at: string;
    created_at: string;
    updated_at: string;
}

// Language colors mapping
const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Jupyter: "#DA5B0B",
    Notebook: "#DA5B0B",
};

/**
 * GitHubRepos Component - Minimalist
 * Fetches and displays active GitHub repositories
 */
export default function GitHubRepos({ username = "tchluc" }: { username?: string }) {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch repos from GitHub API
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6&type=owner`
                );

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data: GitHubRepo[] = await response.json();
                // Filter out forked repos and sort by recent activity
                const ownRepos = data
                    .filter((repo) => !repo.name.includes(".github"))
                    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

                setRepos(ownRepos);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch repos");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
        if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
        return `Il y a ${Math.floor(diffDays / 365)} ans`;
    };

    return (
        <section
            id="github"
            className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section title */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <Github className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                            GitHub Repos
                        </h2>
                    </div>
                    <p className="text-muted text-base mb-4">
                        Mes projets open source et contributions récentes
                    </p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm"
                    >
                        <span>Voir tous les repos</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="minimal-card animate-pulse"
                            >
                                <div className="h-5 bg-muted/20 rounded w-3/4 mb-3" />
                                <div className="h-4 bg-muted/20 rounded w-full mb-2" />
                                <div className="h-4 bg-muted/20 rounded w-2/3 mb-4" />
                                <div className="flex gap-4">
                                    <div className="h-4 bg-muted/20 rounded w-16" />
                                    <div className="h-4 bg-muted/20 rounded w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="max-w-md mx-auto">
                        <div className="minimal-card border-red-500/20">
                            <p className="text-red-400 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-primary"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                )}

                {/* Repos grid */}
                {!loading && !error && repos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="minimal-card group"
                            >
                                {/* Repo name */}
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {repo.name}
                                    </h3>
                                    <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                                </div>

                                {/* Description */}
                                <p className="text-muted text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                                    {repo.description || "Pas de description"}
                                </p>

                                {/* Topics */}
                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {repo.topics.slice(0, 3).map((topic) => (
                                            <span
                                                key={topic}
                                                className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-sm text-muted">
                                    {/* Language */}
                                    {repo.language && (
                                        <div className="flex items-center gap-1.5">
                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        languageColors[repo.language] || "#6b7280",
                                                }}
                                            />
                                            <span>{repo.language}</span>
                                        </div>
                                    )}

                                    {/* Stars */}
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4" />
                                        <span>{repo.stargazers_count}</span>
                                    </div>

                                    {/* Forks */}
                                    <div className="flex items-center gap-1">
                                        <GitFork className="w-4 h-4" />
                                        <span>{repo.forks_count}</span>
                                    </div>
                                </div>

                                {/* Last updated */}
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Mis à jour {formatDate(repo.pushed_at)}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && repos.length === 0 && (
                    <div className="max-w-md mx-auto">
                        <div className="minimal-card text-center">
                            <Code2 className="w-12 h-12 text-muted mx-auto mb-4" />
                            <p className="text-muted">Aucun repo public trouvé</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
