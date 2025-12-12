"use client";

import { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/cn";

interface SkillCategory {
    name: string;
    skills: { name: string; level: number }[];
}

/**
 * SkillsRadarChart Component
 * Interactive radar chart using ECharts showing skill categories
 * Supports dark/light theme with smooth animations
 */
export default function SkillsRadarChart() {
    const [isDark, setIsDark] = useState(true);
    const chartRef = useRef<ReactECharts>(null);

    // Detect theme changes
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // Process skills data for radar chart
    const parentSkills = skills.filter((skill) => skill.category === "parent");
    const childSkills = skills.filter((skill) => skill.category === "child");

    const categories: SkillCategory[] = parentSkills.map((parent) => {
        const children = childSkills.filter((child) => child.parentId === parent.id);
        return {
            name: parent.name,
            skills: children.map((child) => ({
                name: child.name,
                level: child.level || 0,
            })),
        };
    });

    // Calculate average for each category
    const radarIndicators = categories.map((cat) => ({
        name: cat.name,
        max: 100,
    }));

    const radarData = categories.map((cat) => {
        const avg = cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length;
        return Math.round(avg);
    });

    // Color palette
    const colors = {
        primary: "#14b8a6",
        accent: "#3b82f6",
        secondary: "#6366f1",
        text: isDark ? "#f8fafc" : "#0a1628",
        textMuted: isDark ? "#94a3b8" : "#64748b",
        background: isDark ? "#0f172a" : "#ffffff",
        border: isDark ? "#334155" : "#e2e8f0",
    };

    const option = {
        backgroundColor: "transparent",
        tooltip: {
            trigger: "item",
            backgroundColor: colors.background,
            borderColor: colors.border,
            textStyle: {
                color: colors.text,
            },
            formatter: (params: { name: string; value: number[] }) => {
                const cat = categories.find((c) => c.name === params.name);
                if (!cat) return params.name;

                let html = `<strong>${params.name}</strong><br/>`;
                cat.skills.forEach((skill) => {
                    html += `${skill.name}: ${skill.level}%<br/>`;
                });
                return html;
            },
        },
        legend: {
            show: false,
        },
        radar: {
            indicator: radarIndicators,
            shape: "polygon",
            splitNumber: 5,
            axisName: {
                color: colors.text,
                fontSize: 13,
                fontWeight: "bold",
                formatter: (value: string) => value,
            },
            splitLine: {
                lineStyle: {
                    color: [
                        "rgba(20, 184, 166, 0.1)",
                        "rgba(20, 184, 166, 0.15)",
                        "rgba(20, 184, 166, 0.2)",
                        "rgba(20, 184, 166, 0.25)",
                        "rgba(20, 184, 166, 0.3)",
                    ],
                },
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: [
                        "rgba(20, 184, 166, 0.02)",
                        "rgba(20, 184, 166, 0.04)",
                        "rgba(20, 184, 166, 0.06)",
                        "rgba(20, 184, 166, 0.08)",
                        "rgba(20, 184, 166, 0.1)",
                    ],
                },
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(20, 184, 166, 0.3)",
                },
            },
        },
        series: [
            {
                name: "Compétences",
                type: "radar",
                data: [
                    {
                        value: radarData,
                        name: "Niveau Moyen",
                        symbol: "circle",
                        symbolSize: 8,
                        lineStyle: {
                            width: 3,
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: colors.primary },
                                    { offset: 0.5, color: colors.accent },
                                    { offset: 1, color: colors.secondary },
                                ],
                            },
                        },
                        areaStyle: {
                            color: {
                                type: "radial",
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [
                                    { offset: 0, color: "rgba(20, 184, 166, 0.4)" },
                                    { offset: 0.7, color: "rgba(59, 130, 246, 0.2)" },
                                    { offset: 1, color: "rgba(99, 102, 241, 0.1)" },
                                ],
                            },
                        },
                        itemStyle: {
                            color: colors.primary,
                            borderColor: "#fff",
                            borderWidth: 2,
                        },
                    },
                ],
                animationDuration: 1500,
                animationEasing: "elasticOut",
            },
        ],
    };

    return (
        <div
            className={cn(
                "modern-card p-6 rounded-3xl",
                "hover:scale-[1.02] transition-transform duration-500"
            )}
        >
            <h3 className="text-2xl font-display font-bold gradient-text mb-4 text-center">
                Vue d&apos;Ensemble
            </h3>
            <p className="text-foreground/60 text-sm text-center mb-6">
                Niveau moyen par catégorie
            </p>
            <ReactECharts
                ref={chartRef}
                option={option}
                style={{ height: "350px", width: "100%" }}
                opts={{ renderer: "canvas" }}
            />
        </div>
    );
}
