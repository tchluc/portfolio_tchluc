import { Project, Education, Skill, Certification } from "@/types";

// Portfolio Projects Data
export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with Next.js, Stripe, and real-time inventory management",
        image: "/images/projects/ecommerce.jpg",
        tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
        link: "https://example.com",
    },
    {
        id: 2,
        title: "Social Media Dashboard",
        description: "Analytics dashboard with real-time data visualization and AI-powered insights",
        image: "/images/projects/dashboard.jpg",
        tags: ["React", "D3.js", "WebSockets", "Node.js"],
        link: "https://example.com",
    },
    {
        id: 3,
        title: "3D Portfolio Site",
        description: "Immersive 3D portfolio built with Three.js and GSAP scrollytelling",
        image: "/images/projects/3d-portfolio.jpg",
        tags: ["Three.js", "GSAP", "WebGL", "Blender"],
        link: "https://example.com",
    },
    {
        id: 4,
        title: "AI Content Generator",
        description: "AI-powered content generation platform with GPT-4 integration",
        image: "/images/projects/ai-content.jpg",
        tags: ["OpenAI", "Python", "FastAPI", "React"],
        link: "https://example.com",
    },
];

// Education Timeline Data
export const education: Education[] = [
    {
        id: 1,
        year: "2020-2021",
        degree: "BAC C",
        school: "College Protestant Lomé Agbalepedogan",
        description: "Bac scientifique",
        location: "Lomé, Togo",
        image: "/images/schools/cpla.jpg",
    },
    {
        id: 2,
        year: "2021-2024",
        degree: "Ingenieur des travaux en Genie Logiciel et Systeme d'Information",
        school: "Institut Africain d'Informstique Togo",
        description: "BAC +3 en Informatique, Genie Logiciel ",
        location: "Lomé, Togo",
        image: "/images/schools/iai_togo.jpg",
    },
    {
        id: 3,
        year: "2024- En cours",
        degree: "Master en Intelligence Artificielle et Big Data",
        school: "Ecole Polytechnique de lomé & UTBM",
        description: "Master en Intelligence Artificielle et Big Data",
        location: "Lomé, Togo",
        image: "/images/schools/epl.jpg",
    },
];

// Skills Mind Map Data
export const skills: Skill[] = [
    // Parent skills
    {
        id: 1,
        name: "Frontend",
        category: "parent",
    },
    {
        id: 2,
        name: "Backend",
        category: "parent",
    },
    {
        id: 3,
        name: "Design",
        category: "parent",
    },
    {
        id: 4,
        name: "3D & Animation",
        category: "parent",
    },
    {
        id: 5,
        name: "AI & Data Science",
        category: "parent",
    },
    // Frontend children
    {
        id: 11,
        name: "React",
        category: "child",
        parentId: 1,
        level: 95,
    },
    {
        id: 12,
        name: "Next.js",
        category: "child",
        parentId: 1,
        level: 90,
    },
    {
        id: 13,
        name: "TypeScript",
        category: "child",
        parentId: 1,
        level: 92,
    },
    {
        id: 14,
        name: "GSAP",
        category: "child",
        parentId: 1,
        level: 88,
    },
    {
        id: 15,
        name: "Tailwind CSS",
        category: "child",
        parentId: 1,
        level: 95,
    },
    // Backend children
    {
        id: 21,
        name: "Node.js",
        category: "child",
        parentId: 2,
        level: 85,
    },
    {
        id: 22,
        name: "Python",
        category: "child",
        parentId: 2,
        level: 80,
    },
    {
        id: 23,
        name: "PostgreSQL",
        category: "child",
        parentId: 2,
        level: 78,
    },
    {
        id: 24,
        name: "GraphQL",
        category: "child",
        parentId: 2,
        level: 82,
    },
    // Design children
    {
        id: 31,
        name: "Figma",
        category: "child",
        parentId: 3,
        level: 90,
    },
    {
        id: 32,
        name: "UI/UX",
        category: "child",
        parentId: 3,
        level: 88,
    },
    {
        id: 33,
        name: "Branding",
        category: "child",
        parentId: 3,
        level: 75,
    },
    // 3D & Animation children
    {
        id: 41,
        name: "Three.js",
        category: "child",
        parentId: 4,
        level: 85,
    },
    {
        id: 42,
        name: "Blender",
        category: "child",
        parentId: 4,
        level: 70,
    },
    {
        id: 43,
        name: "WebGL",
        category: "child",
        parentId: 4,
        level: 80,
    },
    // AI & Data Science children
    {
        id: 51,
        name: "TensorFlow",
        category: "child",
        parentId: 5,
        level: 85,
    },
    {
        id: 52,
        name: "PyTorch",
        category: "child",
        parentId: 5,
        level: 82,
    },
    {
        id: 53,
        name: "Pandas",
        category: "child",
        parentId: 5,
        level: 88,
    },
    {
        id: 54,
        name: "Scikit-learn",
        category: "child",
        parentId: 5,
        level: 80,
    },
    {
        id: 55,
        name: "OpenAI API",
        category: "child",
        parentId: 5,
        level: 75,
    },
    {
        id: 56,
        name: "Keras",
        category: "child",
        parentId: 5,
        level: 78,
    },
];

// Certifications Data
export const certifications: Certification[] = [
    {
        id: 1,
        name: "Docker Essentials: A Developer Introduction",
        issuer: "IBM",
        date: "2025",
        badgeUrl: "/images/badges/docker.png",
        credentialUrl: "https://www.credly.com/badges/d59da71a-4071-4344-b59c-38c3a3bdbd05/public_url",
        skills: ["Docker", "Containers", "Image Management", "Docker Compose", "DevOps"],
    },
    {
        id: 2,
        name: "Meta Front-End Developer",
        issuer: "Meta",
        date: "2025",
        badgeUrl: "/images/badges/AI_F.png",
        credentialUrl: "https://www.credly.com/badges/8d940a03-319e-4d84-b49a-10a404bee9b7/public_url",
        skills: ["AI Fundamentals", "Machine Learning", "Neural Networks", "Deep Learning", "AI Ethics"],
    },
    {
        id: 3,
        name: "Google UX Design",
        issuer: "Google",
        date: "2022",
        badgeUrl: "/images/badges/data_tools.png",
        credentialUrl: "https://www.credly.com/badges/16626303-09ad-494e-bd22-32a7178bb711/public_url",
        skills: ["Data Analysis", "Python", "SQL", "Data Visualization", "Pandas", "NumPy"],
    },
    {
        id: 4,
        name: "Advanced GSAP Animations",
        issuer: "GreenSock",
        date: "2024",
        badgeUrl: "/images/badges/deep_L.png",
        credentialUrl: "https://greensock.com/",
        skills: ["Deep Learning", "TensorFlow", "PyTorch", "CNNs", "RNNs", "Transfer Learning"],
    },
];
