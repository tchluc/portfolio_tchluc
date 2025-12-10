// Project Interface
export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
}

// Education Interface
export interface Education {
    id: number;
    year: string;
    degree: string;
    school: string;
    description: string;
    location: string;
    image: string;
}

// Skill Interface
export interface Skill {
    id: number;
    name: string;
    category: "parent" | "child";
    parentId?: number;
    level?: number;
    icon?: string;
}

// Certification Interface
export interface Certification {
    id: number;
    name: string;
    issuer: string;
    date: string;
    badgeUrl: string;
    credentialUrl?: string;
    skills: string[];
}
