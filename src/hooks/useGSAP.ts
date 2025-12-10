export { useGSAP } from "@gsap/react";

/**
 * Re-export the official GSAP React hook
 * This hook automatically handles cleanup of GSAP animations
 * when components unmount, preventing memory leaks
 * 
 * Usage:
 * import { useGSAP } from "@/hooks/useGSAP";
 * 
 * useGSAP(() => {
 *   gsap.to(".element", { x: 100 });
 * }, [dependencies]);
 */
