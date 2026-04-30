import { useState, useEffect, useMemo } from "react";

interface ScreenDimensions {
    width: number;
    height: number;
}

interface Breakpoints {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
}

export function useScreenDimensions() {
    const [dimensions, setDimensions] = useState<ScreenDimensions>(() => {
        // Initialize with safe defaults for SSR
        if (typeof window === "undefined") {
            return { width: 1024, height: 768 };
        }
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        let timeoutId: NodeJS.Timeout;
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;

        const handleResize = () => {
            // Only update if dimensions actually changed
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;

            if (currentWidth !== lastWidth || currentHeight !== lastHeight) {
                // Debounce resize events to improve performance
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setDimensions({
                        width: currentWidth,
                        height: currentHeight,
                    });
                    lastWidth = currentWidth;
                    lastHeight = currentHeight;
                }, 150); // Reduced debounce time for better responsiveness
            }
        };

        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const breakpoints = useMemo<Breakpoints>(
        () => ({
            isMobile: dimensions.width < 640,
            isTablet: dimensions.width >= 640 && dimensions.width < 1024,
            isDesktop: dimensions.width >= 1024 && dimensions.width < 1536,
            isLargeDesktop: dimensions.width >= 1536,
        }),
        [dimensions.width],
    );

    return {
        ...dimensions,
        ...breakpoints,
    };
}
